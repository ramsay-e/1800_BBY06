// Fitmeal's firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAwKw9nxIDn3tfJm3qiI2GJV2d_YuYwn6w",
    authDomain: "fitmeal-df106.firebaseapp.com",
    projectId: "fitmeal-df106",
    storageBucket: "fitmeal-df106.appspot.com",
    messagingSenderId: "717872291044",
    appId: "1:717872291044:web:0aa1649cf10ca9e44a60f1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();