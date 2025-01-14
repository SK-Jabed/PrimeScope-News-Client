import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../config/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //       console.log("CurrentUser-->", currentUser?.email);
  //       if (currentUser?.email) {
  //         setUser(currentUser);

  //         // Get JWT token
  //         await axios.post(
  //           `${import.meta.env.VITE_API_URL}/jwt`,
  //           {
  //             email: currentUser?.email,
  //           },
  //           { withCredentials: true }
  //         );
  //       } else {
  //         setUser(currentUser);
  //         await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
  //           withCredentials: true,
  //         });
  //       }
  //       setLoading(false);
  //     });
  //     return () => {
  //       return unsubscribe();
  //     };
  //   }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createNewUser,
    loginUser,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
