"use client";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  const auth = getAuth();

  try {
    //return auth.signOut();
    auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

export async function signInAnonymous() {
  const auth = getAuth();

  try {
    return await signInAnonymously(auth);
  } catch (error) {
    console.error(error);
  }
}
