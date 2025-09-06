import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCt91i_ci2ZZYXiSnBMgsTSeGgxHgLEyp0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hila-kafe.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hila-kafe",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hila-kafe.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "421803462143",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:421803462143:web:070d679534a42e28702bca"
};

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
