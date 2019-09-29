import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCowYCZFDUR3vSJlv7eIKRiQGBVO8uNrho",
    authDomain: "share-pay-61301.firebaseapp.com",
    databaseURL: "https://share-pay-61301.firebaseio.com",
    projectId: "share-pay-61301",
    storageBucket: "share-pay-61301.appspot.com",
    messagingSenderId: "1016314019178",
    appId: "1:1016314019178:web:602b34f6a26bc5d6c4f913"
  };

  const Firebase = firebase.initializeApp(firebaseConfig);
  export default Firebase;