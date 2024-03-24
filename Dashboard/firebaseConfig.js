import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDbT5ZcxuFyaFIrDcaesWs7CK4GMJPmTBM",
    authDomain: "noteshelper2024.firebaseapp.com",
    projectId: "noteshelper2024",
    storageBucket: "noteshelper2024.appspot.com",
    messagingSenderId: "805033085885",
    appId: "1:805033085885:web:dbae9b6fb822473eeae0d4",
    measurementId: "G-2VNGLBRQWR",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account ",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
