import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAQbRW7CoXQw_Fc8CV1vfDxMojY0hWDb80',
  authDomain: 'albatross-724e2.firebaseapp.com',
  databaseURL: 'https://albatross-724e2.firebaseio.com',
  projectId: 'albatross-724e2',
  storageBucket: 'albatross-724e2.appspot.com',
  messagingSenderId: '686098972510',
  appId: '1:686098972510:web:16ef059581669e848419cf',
  measurementId: 'G-SWNWCGH4D3'
};

export const fb = firebase.initializeApp(config);
