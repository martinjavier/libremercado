import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAlfdOfDNLgk2I3vi4DM-rDePF_F89S3k",
  authDomain: "libremercado-3ff35.firebaseapp.com",
  projectId: "libremercado-3ff35",
  storageBucket: "libremercado-3ff35.appspot.com",
  messagingSenderId: "1086972107437",
  appId: "1:1086972107437:web:aae304c6cc8f43358b0424"
};

const app = firebase.initializeApp(firebaseConfig)

export const getFirestore = () => {
    return firebase.firestore(app)
}