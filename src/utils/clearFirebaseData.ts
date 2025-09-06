import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Firebase'deki tüm verileri temizle
export async function clearAllFirebaseData() {
  try {
    console.log('Firebase verileri temizleniyor...');
    
    // Müşterileri temizle
    const customersSnapshot = await getDocs(collection(db, 'customers'));
    for (const customerDoc of customersSnapshot.docs) {
      await deleteDoc(doc(db, 'customers', customerDoc.id));
      console.log(`Müşteri silindi: ${customerDoc.id}`);
    }
    
    // Menü kategorilerini temizle
    const categoriesSnapshot = await getDocs(collection(db, 'menuCategories'));
    for (const categoryDoc of categoriesSnapshot.docs) {
      await deleteDoc(doc(db, 'menuCategories', categoryDoc.id));
      console.log(`Kategori silindi: ${categoryDoc.id}`);
    }
    
    console.log('Tüm Firebase verileri temizlendi!');
  } catch (error) {
    console.error('Veri temizleme hatası:', error);
  }
}
