// ============================================
// AuthProvider - Authentication Context
// ============================================
// This is the "brain" of our app's authentication
// All auth related logic lives here
// Using Context API, any component can access auth data

import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

// Step 1: Create Context - this acts like a "container"
// that we use to pass data around
export const AuthContext = createContext(null);

// Step 2: Create Google and GitHub providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  // Step 3: Maintain user state
  const [user, setUser] = useState(null);
  // Loading state - stays true until Firebase checks if user is logged in
  const [loading, setLoading] = useState(true);

  // ========== REGISTRATION ==========
  // Create a new account with Email & Password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ========== LOGIN with Email & Password ==========
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ========== LOGIN with Google ==========
  // A Google login page will appear in a popup
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ========== LOGIN with GitHub ==========
  // A GitHub login page will appear in a popup
  const signInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // ========== LOGOUT ==========
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ========== OBSERVER ==========
  // Set up Firebase "observer" using useEffect
  // It continuously checks whether the user is logged in or not
  // User stays logged in even after page refresh
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current User:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup function - turn off the observer when component unmounts
    return () => {
      unSubscribe();
    };
  }, []);

  // Step 4: Put everything we want to share into one object
  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    signInWithGithub,
    logOut,
  };

  // Step 5: Wrap children components with Context.Provider
  // Pass authInfo through the value prop
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
