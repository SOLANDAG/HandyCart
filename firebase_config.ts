import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCilCyVaD4YxwjrHtPhBPYQqCpqBV3t1i8',
  authDomain: 'handycart-css152l.firebaseapp.com',
  projectId: 'handycart-css152l',
  storageBucket: 'handycart-css152l.appspot.com',
  messagingSenderId: '1093555427478',
  appId: '1:1093555427478:web:ae0cd4abff3893e31e4ab7',
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
