import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDZYqwSCth5U1GtkfR5ECOLW4NqloARqss',
    authDomain: 'react-instagram-clone-be07a.firebaseapp.com',
    databaseURL:
        'https://react-instagram-clone-be07a-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'react-instagram-clone-be07a',
    storageBucket: 'react-instagram-clone-be07a.appspot.com',
    messagingSenderId: '674745343610',
    appId: '1:674745343610:web:40bf3feebd9fc240f065c3',
    measurementId: 'G-3WC2XBBHYS'
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }