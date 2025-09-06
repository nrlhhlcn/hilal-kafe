import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { menuCategories, initialCustomers } from '../data/menuData';

// Firebase'deki tekrarlanan verileri temizle ve doğru verileri yükle
export async function fixDuplicateData() {
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
    
    console.log('Tüm veriler temizlendi, yeni veriler yükleniyor...');
    
    // Müşterileri yükle
    for (const customer of initialCustomers) {
      await addDoc(collection(db, 'customers'), customer);
      console.log(`Müşteri yüklendi: ${customer.name}`);
    }
    
    // Menü kategorilerini yükle
    for (const category of menuCategories) {
      await addDoc(collection(db, 'menuCategories'), category);
      console.log(`Kategori yüklendi: ${category.name}`);
    }
    
    console.log('Tüm veriler başarıyla yüklendi!');
  } catch (error) {
    console.error('Veri düzeltme hatası:', error);
  }
}
