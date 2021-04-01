/*
  Ce fichier contient les variables de configuration
  reliées à Firebase et ses produits.
*/

// Configuration Firebase (mettez-y les vôtres !)
const firebaseConfig = {
  apiKey: "AIzaSyDYXixKoQkDQRBQM6g_v0lspnYwWsUV2OM",
  authDomain: "veille-technologique-173fb.firebaseapp.com",
  databaseURL: "https://veille-technologique-173fb-default-rtdb.firebaseio.com",
  projectId: "veille-technologique-173fb",
  storageBucket: "veille-technologique-173fb.appspot.com",
  messagingSenderId: "884338243671",
  appId: "1:884338243671:web:1e216f22b558fb53a98b12",
  measurementId: "G-95QWWJ1VMS"
};

export default firebaseConfig;

// Nom de la collection principale
export const utilRef = "utilisateurs-ex5";
// Nom de la sous-collection
export const dossRef = "dossiers";