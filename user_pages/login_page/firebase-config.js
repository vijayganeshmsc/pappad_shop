// Firebase Configuration
// Using Firebase Compat version for compatibility with existing code
// Replace this with your actual Firebase configuration from Firebase Console

const firebaseConfig = {
  apiKey: "AIzaSyBSZX8pYcVofhYSQcUvJ5nA3btBtL1qY3k",
  authDomain: "pappad-shop-auth.firebaseapp.com",
  projectId: "pappad-shop-auth",
  storageBucket: "pappad-shop-auth.firebasestorage.app",
  messagingSenderId: "224698273939",
  appId: "1:224698273939:web:e9f3e020e4e7733c6b7d66",
  measurementId: "G-H4RR78JSYE"
};

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = firebaseConfig;
} else {
  window.firebaseConfig = firebaseConfig;
}
