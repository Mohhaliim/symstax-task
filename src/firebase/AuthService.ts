import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { firebaseAuth } from './BaseConfig';
import { FormValues } from '@/types';

setPersistence(firebaseAuth, browserLocalPersistence);

/*
 *   Firebase sign in function, accepts email and password
 */
export const firebaseSignIn = async ({ email, password }: FormValues) => {
  const result = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  console.log(result)
  return result;
};

/*
 *   Firebase sign up function, accepts email and password
 */
export const firebaseSignUp = async ({ email, password }: FormValues) => {
  const result = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  return result;
};

/*
 *   Firebase sign out function
 */
export const firebaseSignOut = async () => {
  const result = await signOut(firebaseAuth);
  return result;
};
