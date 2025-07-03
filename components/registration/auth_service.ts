import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User 
} from "firebase/auth";
import { auth, db } from '../../firebase_config';
import { setDoc, getDoc, doc } from "firebase/firestore";

export const register = async (email: string, password: string, username: string) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  await setDoc(doc(db, 'users', uid), {
    email,
    username,
    createdAt: new Date().toISOString(),
  });

  return userCred;
};

export const login = async (email: string, password: string) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  const userDoc = await getDoc(doc(db, 'users', uid));
  const userData = userDoc.exists() ? userDoc.data() : null;

  return {
    user: userCred.user,
    profile: userData,
  };
};

export const logout = async () => {
  return await signOut(auth);
};

// login session
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
