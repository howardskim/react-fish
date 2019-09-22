import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCL7i2Px1qbBXQOq7ntXVP0mWJq8aWCRfE",
    authDomain: "catch-of-the-day-howard.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-howard.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;