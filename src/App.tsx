import React, { useState, useEffect } from 'react';
import { Customer, OrderItem, MenuItem, Category } from './types';
import { menuCategories as initialMenuCategories, initialCustomers } from './data/menuData';
import { useCustomers, useMenuCategories } from './hooks/useFirestore';
import { uploadAllData } from './utils/uploadToFirebase';
import { fixDuplicateData } from './utils/fixDuplicateData';
import { Header } from './components/Header';
import { CustomerCard } from './components/CustomerCard';
import { CategoryCard } from './components/CategoryCard';
import { MenuItemCard } from './components/MenuItemCard';
import { Cart } from './components/Cart';
import { AddCustomerModal } from './components/AddCustomerModal';
import { AddMenuItemModal } from './components/AddMenuItemModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { LoginModal } from './components/LoginModal';

type View = 'customers' | 'categories' | 'items';

function App() {
  const { customers, setCustomers, loading: customersLoading, addCustomer, updateCustomer, deleteCustomer } = useCustomers();
  const { menuCategories, loading: menuLoading, addMenuItem, deleteMenuItem, refreshCategories } = useMenuCategories();
  
  const [currentView, setCurrentView] = useState<View>(() => {
    const saved = localStorage.getItem('currentView');
    return (saved as View) || 'customers';
  });
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(() => {
    const saved = localStorage.getItem('selectedCustomer');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(() => {
    const saved = localStorage.getItem('selectedCategory');
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showAddMenuItemModal, setShowAddMenuItemModal] = useState(false);
  const [showOrderHistoryModal, setShowOrderHistoryModal] = useState(false);
  const [selectedCustomerForHistory, setSelectedCustomerForHistory] = useState<Customer | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState<{
    type: 'customer' | 'menuItem';
    id: string;
    name: string;
    categoryId?: string;
  } | null>(null);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('hilalKafeAuth') === 'true';
  });
  const [showLogin, setShowLogin] = useState(false);

  // Firebase'e veri yükle (sadece ilk kez)
  useEffect(() => {
    // Sadece müşteri yoksa veri yükle
    if (customers.length === 0 && !customersLoading) {
      fixDuplicateData();
    }
  }, [customers.length, customersLoading]);


  // Debug: menuCategories değişikliklerini izle
  useEffect(() => {
    console.log('menuCategories güncellendi:', menuCategories.map(c => ({ 
      name: c.name, 
      itemCount: c.items?.length || 0 
    })));
  }, [menuCategories]);

  const handleCustomerSelect = (customer: Customer) => {
    console.log('Seçilen müşteri:', customer);
    console.log('Firebase müşterileri:', customers.map(c => ({ name: c.name, id: c.id })));
    
    // Eğer customer zaten Firebase'den geliyorsa (doc.id varsa), direkt kullan
    if (customer.id && customer.id.length > 10) { // Firestore ID'leri genelde uzun
      console.log('Seçilen müşteri (Firebase):', customer);
      setSelectedCustomer(customer);
      localStorage.setItem('selectedCustomer', JSON.stringify(customer));
    } else {
      // Eğer initialCustomers'dan geliyorsa, Firebase'deki gerçek müşteriyi bul
      const firebaseCustomer = customers.find(c => c.name === customer.name);
      console.log('Bulunan Firebase müşterisi:', firebaseCustomer);
      
      if (firebaseCustomer) {
        console.log('Seçilen müşteri (Firebase):', firebaseCustomer);
        setSelectedCustomer(firebaseCustomer);
        localStorage.setItem('selectedCustomer', JSON.stringify(firebaseCustomer));
      } else {
        console.log('Seçilen müşteri (Initial):', customer);
        setSelectedCustomer(customer);
        localStorage.setItem('selectedCustomer', JSON.stringify(customer));
      }
    }
    setCurrentView('categories');
    localStorage.setItem('currentView', 'categories');
  };

  const handleCategorySelect = (category: Category) => {
    console.log('Seçilen kategori:', category.name, category.id);
    setSelectedCategory(category);
    setCurrentView('items');
    localStorage.setItem('selectedCategory', JSON.stringify(category));
    localStorage.setItem('currentView', 'items');
  };

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
    
    // Sepete ekleme bildirimi
    showToast(`${item.name} sepete eklendi!`, 'success');
  };

  const handleUpdateCartQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleConfirmOrder = async () => {
    console.log('handleConfirmOrder çağrıldı');
    console.log('selectedCustomer:', selectedCustomer);
    console.log('cart:', cart);
    
    if (!selectedCustomer || cart.length === 0) {
      showToast('Sepetiniz boş veya müşteri seçilmemiş!', 'error');
      return;
    }

    try {
      const today = new Date().toDateString();
      const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      console.log('Sipariş toplamı:', orderTotal);

      // selectedCustomer artık Firebase'deki gerçek müşteri
      const firebaseCustomer = selectedCustomer;
      console.log('Seçilen müşteri:', firebaseCustomer.name, 'ID:', firebaseCustomer.id, 'WeeklyTotal:', firebaseCustomer.weeklyTotal);

      console.log('Mevcut müşteri:', firebaseCustomer.name, 'ID:', firebaseCustomer.id);
      console.log('Mevcut dailyOrders:', firebaseCustomer.dailyOrders);
      console.log('Mevcut weeklyTotal:', firebaseCustomer.weeklyTotal);

      // Yeni sipariş verilerini hazırla
      const existingOrderIndex = firebaseCustomer.dailyOrders.findIndex(order => order.date === today);
      let updatedDailyOrders;
      let newWeeklyTotal;

      if (existingOrderIndex >= 0) {
        // Mevcut günlük siparişi güncelle
        updatedDailyOrders = [...firebaseCustomer.dailyOrders];
        updatedDailyOrders[existingOrderIndex] = {
          ...updatedDailyOrders[existingOrderIndex],
          items: [...updatedDailyOrders[existingOrderIndex].items, ...cart],
          total: updatedDailyOrders[existingOrderIndex].total + orderTotal
        };
        newWeeklyTotal = firebaseCustomer.weeklyTotal + orderTotal;
      } else {
        // Yeni günlük sipariş oluştur
        updatedDailyOrders = [
          ...firebaseCustomer.dailyOrders,
          { 
            date: today, 
            items: cart, 
            total: orderTotal,
            timestamp: new Date().toISOString() // Firebase için timestamp ekle
          }
        ];
        newWeeklyTotal = firebaseCustomer.weeklyTotal + orderTotal;
      }

      console.log('Güncellenmiş dailyOrders:', updatedDailyOrders);
      console.log('Güncellenmiş weeklyTotal:', newWeeklyTotal);

      // Firebase'e güncelle
      await updateCustomer(firebaseCustomer.id, {
        name: firebaseCustomer.name,
        dailyOrders: updatedDailyOrders,
        weeklyTotal: newWeeklyTotal
      });

      // Local state'i de güncelle (onSnapshot gecikmeli olabilir)
      const updatedCustomers = customers.map(customer => 
        customer.id === firebaseCustomer.id 
          ? { ...customer, dailyOrders: updatedDailyOrders, weeklyTotal: newWeeklyTotal }
          : customer
      );
      setCustomers(updatedCustomers);

      setCart([]);
      setShowCart(false);
      setCurrentView('customers');
      setSelectedCustomer(null);
      setSelectedCategory(null);
      localStorage.removeItem('selectedCustomer');
      localStorage.removeItem('selectedCategory');
      localStorage.setItem('currentView', 'customers');
      showToast(`${firebaseCustomer.name} için sipariş başarıyla oluşturuldu!`, 'success');
    } catch (error) {
      console.error('Sipariş kaydedilirken hata:', error);
      showToast('Sipariş kaydedilirken hata oluştu!', 'error');
    }
  };

  const handleNavigateBack = () => {
    if (currentView === 'items') {
      setCurrentView('categories');
      setSelectedCategory(null);
      localStorage.setItem('currentView', 'categories');
      localStorage.removeItem('selectedCategory');
    } else if (currentView === 'categories') {
      setCurrentView('customers');
      setSelectedCustomer(null);
      setCart([]);
      localStorage.setItem('currentView', 'customers');
      localStorage.removeItem('selectedCustomer');
    }
  };

  const handleNavigateHome = () => {
    setCurrentView('customers');
    setSelectedCustomer(null);
    setSelectedCategory(null);
    setCart([]);
    localStorage.setItem('currentView', 'customers');
    localStorage.removeItem('selectedCustomer');
    localStorage.removeItem('selectedCategory');
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleAddCustomer = async (name: string) => {
    try {
      await addCustomer({ name });
    } catch (error) {
      console.error('Müşteri eklenirken hata:', error);
    }
  };

  const handleAddMenuItem = async (categoryId: string, newItem: Omit<MenuItem, 'id'>) => {
    try {
      console.log('Ürün ekleniyor:', { categoryId, newItem });
      const newMenuItem: MenuItem = {
        ...newItem,
        id: `${categoryId}-${Date.now()}`
      };
      console.log('Yeni ürün objesi:', newMenuItem);
      await addMenuItem(categoryId, newMenuItem);
      console.log('Ürün başarıyla eklendi!');
      
      // Kategorileri yenile ve selectedCategory'yi güncelle
      const updatedCategory = await refreshCategories(selectedCategory);
      if (updatedCategory) {
        setSelectedCategory(updatedCategory);
        localStorage.setItem('selectedCategory', JSON.stringify(updatedCategory));
      }
      
      showToast(`${newItem.name} başarıyla eklendi!`, 'success');
    } catch (error) {
      console.error('Ürün eklenirken hata:', error);
      showToast('Ürün eklenirken hata oluştu!', 'error');
    }
  };

  const handleDeleteCustomer = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setDeleteModalData({
        type: 'customer',
        id: customerId,
        name: customer.name
      });
      setShowDeleteModal(true);
    }
  };

  const handleViewOrderHistory = (customer: Customer) => {
    setSelectedCustomerForHistory(customer);
    setShowOrderHistoryModal(true);
  };

  const handleDeleteMenuItem = (categoryId: string, itemId: string) => {
    const category = menuCategories.find(c => c.id === categoryId);
    const item = category?.items.find(i => i.id === itemId);
    if (item) {
      setDeleteModalData({
        type: 'menuItem',
        id: itemId,
        name: item.name,
        categoryId
      });
      setShowDeleteModal(true);
    }
  };

  const handleLogin = (password: string) => {
    localStorage.setItem('hilalKafeAuth', 'true');
    setIsLoggedIn(true);
    setShowLogin(false);
    setToast({ show: true, message: 'Giriş başarılı!', type: 'success' });
  };

  const handleLogout = () => {
    localStorage.removeItem('hilalKafeAuth');
    setIsLoggedIn(false);
    setToast({ show: true, message: 'Çıkış yapıldı!', type: 'success' });
  };

  const confirmDelete = async () => {
    if (!deleteModalData) return;

    try {
      if (deleteModalData.type === 'customer') {
        await deleteCustomer(deleteModalData.id);
        showToast(`${deleteModalData.name} müşterisi silindi!`, 'success');
      } else if (deleteModalData.type === 'menuItem' && deleteModalData.categoryId) {
        await deleteMenuItem(deleteModalData.categoryId, deleteModalData.id);
        
        // Kategorileri yenile ve selectedCategory'yi güncelle
        const updatedCategory = await refreshCategories(selectedCategory);
        if (updatedCategory) {
          setSelectedCategory(updatedCategory);
          localStorage.setItem('selectedCategory', JSON.stringify(updatedCategory));
        }
        
        showToast(`${deleteModalData.name} ürünü silindi!`, 'success');
      }
    } catch (error) {
      console.error('Silme işlemi sırasında hata:', error);
      showToast('Silme işlemi sırasında hata oluştu!', 'error');
    }

    setShowDeleteModal(false);
    setDeleteModalData(null);
  };

  const getAddButtonConfig = () => {
    switch (currentView) {
      case 'customers':
        return {
          show: true,
          text: 'Müşteri Ekle',
          action: () => setShowAddCustomerModal(true)
        };
      case 'items':
        return {
          show: true,
          text: 'Ürün Ekle',
          action: () => setShowAddMenuItemModal(true)
        };
      default:
        return { show: false, text: '', action: () => {} };
    }
  };

  const addButtonConfig = getAddButtonConfig();

  // Loading durumu
  if (customersLoading || menuLoading) {
    return (
      <div className="min-h-screen restaurant-bg flex items-center justify-center">
        <div className="text-white text-2xl">Yükleniyor...</div>
      </div>
    );
  }

  // Giriş kontrolü
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen restaurant-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8 text-shadow">Hilal Kafe</h1>
          <button
            onClick={() => setShowLogin(true)}
            className="modern-button text-xl px-8 py-4"
          >
            Giriş Yap
          </button>
        </div>
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen restaurant-bg">
      <Header 
        currentView={currentView}
        customerName={selectedCustomer?.name}
        categoryName={selectedCategory?.name}
        onNavigateBack={handleNavigateBack}
        onNavigateHome={handleNavigateHome}
        onAddNew={addButtonConfig.action}
        showAddButton={addButtonConfig.show}
        addButtonText={addButtonConfig.text}
        onToggleCart={toggleCart}
        cartItemCount={cart.length}
        showCartButton={(currentView === 'items' && selectedCategory !== null) || (currentView === 'categories' && selectedCustomer !== null)}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        {currentView === 'customers' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Müşterilerimiz</h2>
              <p className="text-white">Sipariş vermek için müşteri seçiniz</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {customers.map((customer) => (
                <CustomerCard 
                  key={customer.id} 
                  customer={customer} 
                  onClick={() => handleCustomerSelect(customer)}
                  onDelete={handleDeleteCustomer}
                  onViewHistory={handleViewOrderHistory}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'categories' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Menü Kategorileri</h2>
              <p className="text-white">Kategori seçerek ürünleri görüntüleyiniz</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {menuCategories.map((category) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  onClick={() => handleCategorySelect(category)} 
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'items' && selectedCategory && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">{selectedCategory.name}</h2>
              <p className="text-white">Ürün seçiniz ve sepetinize ekleyiniz</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {selectedCategory.items.map((item) => (
                <MenuItemCard 
                  key={item.id} 
                  item={item} 
                  onAddToCart={handleAddToCart}
                  onDelete={(itemId) => handleDeleteMenuItem(selectedCategory.id, itemId)}
                  showDeleteButton={true}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <AddCustomerModal 
        isOpen={showAddCustomerModal}
        onClose={() => setShowAddCustomerModal(false)}
        onAdd={handleAddCustomer}
      />
      
      <AddMenuItemModal 
        isOpen={showAddMenuItemModal}
        onClose={() => setShowAddMenuItemModal(false)}
        onAdd={handleAddMenuItem}
        categories={menuCategories}
        selectedCategoryId={selectedCategory?.id}
      />
      
      <OrderHistoryModal 
        isOpen={showOrderHistoryModal}
        onClose={() => setShowOrderHistoryModal(false)}
        customer={selectedCustomerForHistory}
      />
      
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteModalData(null);
        }}
        onConfirm={confirmDelete}
        title={deleteModalData?.type === 'customer' ? 'Müşteriyi Sil' : 'Ürünü Sil'}
        message={deleteModalData?.type === 'customer' 
          ? 'Bu müşteriyi silmek istediğinizden emin misiniz? Tüm sipariş geçmişi de silinecektir.'
          : 'Bu ürünü silmek istediğinizden emin misiniz?'
        }
        itemName={deleteModalData?.name || ''}
      />

      {/* Sepet Modal */}
      <Cart 
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onConfirmOrder={handleConfirmOrder}
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />

      {/* Toast Mesajları */}
      {toast.show && (
        <div className={`fixed top-20 right-4 z-40 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            <div className="text-lg">
              {toast.type === 'success' ? '✅' : '❌'}
            </div>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;