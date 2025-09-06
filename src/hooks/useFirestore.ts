import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  setDoc,
  deleteDoc, 
  query, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Müşteriler için hook
export function useCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const customersRef = collection(db, 'customers');
    const q = query(customersRef, orderBy('name'));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const customersData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id, // Firestore Document ID
            name: data.name,
            weeklyTotal: data.weeklyTotal || 0,
            dailyOrders: data.dailyOrders || []
          };
        });
        console.log('Firebase\'den gelen müşteriler:', customersData);
        setCustomers(customersData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addCustomer = async (customerData: any) => {
    try {
      const docRef = await addDoc(collection(db, 'customers'), {
        ...customerData,
        weeklyTotal: 0,
        dailyOrders: []
      });
      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      throw err;
    }
  };

  const updateCustomer = async (customerId: string, customerData: any) => {
    try {
      console.log('updateCustomer çağrıldı:', customerId);
      console.log('Güncellenecek veri:', JSON.stringify(customerData, null, 2));
      
      const customerRef = doc(db, 'customers', customerId);
      
      // Önce mevcut dökümanı kontrol et
      const customerDoc = await getDoc(customerRef);
      console.log('Mevcut döküman var mı:', customerDoc.exists());
      
      if (customerDoc.exists()) {
        console.log('Mevcut döküman verisi:', customerDoc.data());
        // Döküman varsa güncelle
        await updateDoc(customerRef, customerData);
        console.log('updateDoc ile güncellendi:', customerId);
      } else {
        console.log('Döküman yok, oluşturuluyor:', customerId);
        // Döküman yoksa oluştur
        await setDoc(customerRef, customerData);
        console.log('setDoc ile oluşturuldu:', customerId);
      }
      
      // Güncelleme sonrası dökümanı kontrol et
      const updatedDoc = await getDoc(customerRef);
      console.log('Güncelleme sonrası döküman:', updatedDoc.data());
      
    } catch (err) {
      console.error('updateCustomer hatası:', err);
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      throw err;
    }
  };

  const deleteCustomer = async (customerId: string) => {
    try {
      const customerRef = doc(db, 'customers', customerId);
      await deleteDoc(customerRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      throw err;
    }
  };

  return {
    customers,
    setCustomers,
    loading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer
  };
}

// Menü kategorileri için hook
export function useMenuCategories() {
  const [menuCategories, setMenuCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const categoriesRef = collection(db, 'menuCategories');
    const q = query(categoriesRef, orderBy('name'));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const categoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Firebase real-time güncelleme:', categoriesData.map(c => ({ id: c.id, name: c.name, itemCount: c.items?.length || 0 })));
        setMenuCategories(categoriesData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addMenuItem = async (categoryId: string, menuItem: any) => {
    try {
      console.log('addMenuItem çağrıldı:', { categoryId, menuItem });
      
      // Önce mevcut kategorileri al
      const categoriesRef = collection(db, 'menuCategories');
      const categoriesSnapshot = await getDocs(categoriesRef);
      
      // Kategori ID'si ile veya name ile bul - basit karşılaştırma
      let targetCategory = null;
      console.log('Aranan kategori ID:', categoryId);
      
      for (const doc of categoriesSnapshot.docs) {
        const data = doc.data();
        console.log('Kontrol edilen kategori:', { id: doc.id, name: data.name });
        
        // Esnek karşılaştırma
        const categoryName = data.name.toLowerCase()
          .replace(/ç/g, 'c')
          .replace(/ğ/g, 'g')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ş/g, 's')
          .replace(/ü/g, 'u')
          .replace(/&/g, '')
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        
        const searchId = categoryId.toLowerCase()
          .replace(/ç/g, 'c')
          .replace(/ğ/g, 'g')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ş/g, 's')
          .replace(/ü/g, 'u')
          .replace(/&/g, '')
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        
        console.log('Karşılaştırma:', { 
          categoryName, 
          searchId, 
          originalName: data.name,
          originalId: categoryId 
        });
        
        if (doc.id === categoryId || 
            data.name === categoryId || 
            data.name.toLowerCase() === categoryId.toLowerCase() ||
            categoryName === searchId) {
          targetCategory = { id: doc.id, data };
          console.log('Kategori bulundu!', targetCategory);
          break;
        }
      }
      
      if (targetCategory) {
        const categoryRef = doc(db, 'menuCategories', targetCategory.id);
        const updatedItems = [...targetCategory.data.items, menuItem];
        console.log('Güncellenmiş ürün listesi:', updatedItems);
        await updateDoc(categoryRef, { items: updatedItems });
        console.log('Firebase güncellendi!');
        
        // Manuel güncelleme - onSnapshot çalışmıyorsa
        setMenuCategories(prevCategories => {
          const updatedCategories = prevCategories.map(category => {
            if (category.id === targetCategory.id) {
              return {
                ...category,
                items: [...category.items, menuItem]
              };
            }
            return category;
          });
          console.log('Manuel güncelleme yapıldı!', updatedCategories);
          return updatedCategories;
        });
      } else {
        console.error('Kategori bulunamadı:', categoryId);
        console.log('Mevcut kategoriler:', categoriesSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
      }
    } catch (err) {
      console.error('addMenuItem hatası:', err);
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      throw err;
    }
  };

  const deleteMenuItem = async (categoryId: string, itemId: string) => {
    try {
      console.log('deleteMenuItem çağrıldı:', { categoryId, itemId });
      
      // Önce mevcut kategorileri al
      const categoriesRef = collection(db, 'menuCategories');
      const categoriesSnapshot = await getDocs(categoriesRef);
      
      // Kategori ID'si ile veya name ile bul - esnek karşılaştırma
      let targetCategory = null;
      console.log('Silme için aranan kategori ID:', categoryId);
      
      for (const doc of categoriesSnapshot.docs) {
        const data = doc.data();
        console.log('Silme için kontrol edilen kategori:', { id: doc.id, name: data.name });
        
        // Esnek karşılaştırma
        const categoryName = data.name.toLowerCase()
          .replace(/ç/g, 'c')
          .replace(/ğ/g, 'g')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ş/g, 's')
          .replace(/ü/g, 'u')
          .replace(/&/g, '')
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        
        const searchId = categoryId.toLowerCase()
          .replace(/ç/g, 'c')
          .replace(/ğ/g, 'g')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ş/g, 's')
          .replace(/ü/g, 'u')
          .replace(/&/g, '')
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        
        console.log('Silme karşılaştırması:', { 
          categoryName, 
          searchId, 
          originalName: data.name,
          originalId: categoryId 
        });
        
        if (doc.id === categoryId || 
            data.name === categoryId || 
            data.name.toLowerCase() === categoryId.toLowerCase() ||
            categoryName === searchId) {
          targetCategory = { id: doc.id, data };
          console.log('Silme için kategori bulundu!', targetCategory);
          break;
        }
      }
      
      if (targetCategory) {
        console.log('Silinecek ürün bulundu:', targetCategory);
        const categoryRef = doc(db, 'menuCategories', targetCategory.id);
        const updatedItems = targetCategory.data.items.filter((item: any) => item.id !== itemId);
        console.log('Güncellenmiş ürün listesi:', updatedItems);
        await updateDoc(categoryRef, { items: updatedItems });
        console.log('Ürün Firebase\'den silindi!');
        
        // Manuel güncelleme - onSnapshot çalışmıyorsa
        setMenuCategories(prevCategories => {
          const updatedCategories = prevCategories.map(category => {
            if (category.id === targetCategory.id) {
              return {
                ...category,
                items: category.items.filter((item: any) => item.id !== itemId)
              };
            }
            return category;
          });
          console.log('Manuel silme güncellemesi yapıldı!', updatedCategories);
          return updatedCategories;
        });
      } else {
        console.error('Kategori bulunamadı:', categoryId);
        console.log('Mevcut kategoriler:', categoriesSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
      }
    } catch (err) {
      console.error('deleteMenuItem hatası:', err);
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      throw err;
    }
  };

  const refreshCategories = async (currentSelectedCategory?: any) => {
    try {
      const categoriesRef = collection(db, 'menuCategories');
      const q = query(categoriesRef, orderBy('name'));
      const snapshot = await getDocs(q);
      const categoriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMenuCategories(categoriesData);
      console.log('Kategoriler yenilendi:', categoriesData.map(c => ({ name: c.name, itemCount: c.items?.length || 0 })));
      
      // Eğer seçili kategori varsa, güncellenmiş halini döndür
      if (currentSelectedCategory) {
        const updatedCategory = categoriesData.find(c => c.id === currentSelectedCategory.id);
        return updatedCategory;
      }
      
      return null;
    } catch (err) {
      console.error('Kategoriler yenilenirken hata:', err);
      return null;
    }
  };

  return {
    menuCategories,
    loading,
    error,
    addMenuItem,
    deleteMenuItem,
    refreshCategories
  };
}
