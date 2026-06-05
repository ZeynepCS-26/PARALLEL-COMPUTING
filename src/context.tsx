import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Language, Task } from './types';
import { i18n } from './i18n';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { OperationType, handleFirestoreError } from './firestoreErrorHandler';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof i18n.en;
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  fetchUser: () => Promise<void>;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<UserProfile | null>(null);

  const t = i18n[language];

  const fetchUser = async (uid: string) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      let profileData: UserProfile;
      
      if (userSnap.exists()) {
        const data = userSnap.data();
        profileData = {
          id: data.userId,
          name: data.name,
          isPublic: data.isPublic,
          completedTasks: []
        };
      } else {
        profileData = {
          id: uid,
          name: auth.currentUser?.displayName || 'Research Scholar',
          isPublic: false,
          completedTasks: []
        };
        await setDoc(userRef, {
          userId: profileData.id,
          name: profileData.name,
          isPublic: profileData.isPublic,
          createdAt: Date.now()
        });
      }
      
      const tasksRef = collection(db, 'users', uid, 'tasks');
      const tasksSnap = await getDocs(tasksRef);
      profileData.completedTasks = tasksSnap.docs.map(d => {
         const td = d.data();
         return {
           id: d.id,
           title: td.title,
           description: td.description,
           code: td.code,
           simulationResult: td.simulationResult,
           completedAt: td.completedAt
         } as Task;
      });
      
      setUser(profileData);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `users/${uid}`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchUser(currentUser.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in error", error);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const reloadUser = async () => {
    if (auth.currentUser) {
      await fetchUser(auth.currentUser.uid);
    }
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, t, user, setUser, fetchUser: reloadUser, signIn, logOut }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

