import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Güvenlik kontrolü
if (!firebaseConfig.apiKey) {
  console.error('Firebase API anahtarı bulunamadı! Lütfen environment variable\'ları kontrol edin.');
  throw new Error('Firebase konfigürasyonu eksik');
}

// Debug: Environment variable'ları kontrol et
console.log('Firebase Config Debug:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing'
});

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firestore'u al
export const db = getFirestore(app);

export default app;
