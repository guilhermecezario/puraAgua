var firebaseConfig = {
  apiKey: "AIzaSyDjtqhb3BUZ7-nznEpJ6oLeRsEO960ZZe8",
  authDomain: "puraagua-7985e.firebaseapp.com",
  databaseURL: "https://puraagua-7985e.firebaseio.com",
  projectId: "puraagua-7985e",
  storageBucket: "puraagua-7985e.appspot.com",
  messagingSenderId: "243135690208",
  appId: "1:243135690208:web:6e0f3d0acc06549aba2785",
  measurementId: "G-FGLLFXE9CC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database().ref();
const urlClientes = database.child('clientes');
const urlVendas = database.child('vendas');