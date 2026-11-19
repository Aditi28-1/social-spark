import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

export interface UserProfileData {
  uid: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfileData | null;
  authReady: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signup: (params: {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function mapFirebaseAuthError(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = String((error as { code?: string }).code);
    switch (code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact SocialSpark support.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Incorrect email or password. Please check your credentials and try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Try logging in or resetting your password.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose at least 6 characters with letters and numbers.';
      case 'auth/too-many-requests':
        return 'Too many attempts in a short time. Please wait a moment and try again.';
      case 'auth/network-request-failed':
        return 'Network error while reaching Firebase Authentication. Check your connection and try again.';
      case 'auth/operation-not-allowed':
        return 'Email/Password sign-in is not enabled in Firebase Authentication yet. Enable the Email/Password provider in the Firebase Console under Authentication → Sign-in method.';
      default:
        return (error as { message?: string }).message || 'Authentication failed. Please try again.';
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected authentication error occurred.';
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setProfile(null);
        setAuthReady(true);
        return;
      }

      const profilePath = `users/${firebaseUser.uid}`;
      try {
        const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (snap.exists()) {
          const data = snap.data();
          setProfile({
            uid: firebaseUser.uid,
            fullName: String(data.fullName || firebaseUser.displayName || ''),
            email: String(data.email || firebaseUser.email || ''),
            phoneNumber: String(data.phoneNumber || ''),
          });
        } else {
          setProfile({
            uid: firebaseUser.uid,
            fullName: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            phoneNumber: '',
          });
        }
      } catch (err) {
        // Log structured context if Firestore read fails, without blocking signed-in access
        try {
          handleFirestoreError(err, OperationType.GET, profilePath);
        } catch {
          setProfile({
            uid: firebaseUser.uid,
            fullName: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            phoneNumber: '',
          });
        }
      } finally {
        setAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean): Promise<void> => {
    await setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    );
    await signInWithEmailAndPassword(auth, email.trim(), password);
  };

  const signup = async ({
    fullName,
    email,
    phoneNumber,
    password,
  }: {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }): Promise<void> => {
    await setPersistence(auth, browserLocalPersistence);
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const trimmedName = fullName.trim().slice(0, 100);
    const trimmedEmail = email.trim().slice(0, 254);
    const trimmedPhone = phoneNumber.trim().slice(0, 20);

    await updateProfile(credential.user, { displayName: trimmedName });

    const profilePath = `users/${credential.user.uid}`;
    try {
      await setDoc(doc(db, 'users', credential.user.uid), {
        uid: credential.user.uid,
        fullName: trimmedName,
        email: trimmedEmail,
        phoneNumber: trimmedPhone,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, profilePath);
    }

    setProfile({
      uid: credential.user.uid,
      fullName: trimmedName,
      email: trimmedEmail,
      phoneNumber: trimmedPhone,
    });
  };

  const resetPassword = async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email.trim());
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        authReady,
        login,
        signup,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return ctx;
}
