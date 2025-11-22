import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { toast } from 'react-hot-toast';

const googleProvider = new GoogleAuthProvider();

// Email/Password Sign In
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        phoneNumber: userCredential.user.phoneNumber,
      },
      token: await userCredential.user.getIdToken(),
    };
  } catch (error) {
    const errorMessage = error.message || 'Login failed';
    toast.error(errorMessage);
    throw error;
  }
};

// Email/Password Sign Up
export const signUpWithEmail = async (email, password, name, phone) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with name
    if (name) {
      await updateProfile(userCredential.user, { displayName: name });
    }

    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name || userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        phoneNumber: phone || userCredential.user.phoneNumber,
      },
      token: await userCredential.user.getIdToken(),
    };
  } catch (error) {
    const errorMessage = error.message || 'Registration failed';
    toast.error(errorMessage);
    throw error;
  }
};

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
      },
      token: await user.getIdToken(),
    };
  } catch (error) {
    const errorMessage = error.message || 'Google sign-in failed';
    toast.error(errorMessage);
    throw error;
  }
};

// Sign Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    const errorMessage = error.message || 'Sign out failed';
    toast.error(errorMessage);
    throw error;
  }
};

// Auth State Observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      callback({
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
        },
        token,
      });
    } else {
      callback(null);
    }
  });
};

// Get current user token
export const getCurrentUserToken = async () => {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken();
  }
  return null;
};

