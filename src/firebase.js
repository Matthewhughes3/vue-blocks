import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDqnW3EgSbHaFc6R_FZUjT64lhdb4ZKe7I",
    authDomain: "vue-blocks-d635b.firebaseapp.com",
    databaseURL: "https://vue-blocks-d635b.firebaseio.com",
    projectId: "vue-blocks-d635b",
    storageBucket: "vue-blocks-d635b.appspot.com",
    messagingSenderId: "214684854874",
    appId: "1:214684854874:web:9f0d7ba03ff6254ca6c663"
};

const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore(app);
export const auth = firebase.auth(app);
