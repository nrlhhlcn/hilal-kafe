import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { menuCategories, initialCustomers } from '../data/menuData';

// Menü kategorilerini Firebase'e yükle
export async function uploadMenuCategories() {
  try {
    // Önce mevcut kategorileri kontrol et
    const existingCategories = await getDocs(collection(db, 'menuCategories'));
    
    if (existingCategories.empty) {
      console.log('Menü kategorileri Firebase\'e yükleniyor...');
      
      for (const category of menuCategories) {
        await addDoc(collection(db, 'menuCategories'), category);
        console.log(`${category.name} kategorisi yüklendi`);
      }
      
      console.log('Tüm menü kategorileri başarıyla yüklendi!');
    } else {
      console.log('Menü kategorileri zaten mevcut');
    }
  } catch (error) {
    console.error('Menü kategorileri yüklenirken hata:', error);
  }
}

// Müşterileri Firebase'e yükle
export async function uploadCustomers() {
  try {
    // Önce mevcut müşterileri kontrol et
    const existingCustomers = await getDocs(collection(db, 'customers'));
    
    if (existingCustomers.empty) {
      console.log('Müşteriler Firebase\'e yükleniyor...');
      
      for (const customer of initialCustomers) {
        await addDoc(collection(db, 'customers'), customer);
        console.log(`${customer.name} müşterisi yüklendi`);
      }
      
      console.log('Tüm müşteriler başarıyla yüklendi!');
    } else {
      console.log('Müşteriler zaten mevcut');
    }
  } catch (error) {
    console.error('Müşteriler yüklenirken hata:', error);
  }
}

// Tüm verileri yükle
export async function uploadAllData() {
  await uploadMenuCategories();
  await uploadCustomers();
}
