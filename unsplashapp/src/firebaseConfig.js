
import firebase from 'firebase/compat/app'

import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-wxzFVE_m5hIrhj6DWw252sVXjab_HUs",
    authDomain: "mlhhack-e682a.firebaseapp.com",
    projectId: "mlhhack-e682a",
    storageBucket: "mlhhack-e682a.appspot.com",
    messagingSenderId: "347968515316",
    appId: "1:347968515316:web:806ff89c1ed45856b942a1"
  };

  const app = firebase.initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);

