import { getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0aJ31z5z3FVyccVNbqWywqnXJFGYf5_s",
  authDomain: "ckite-ca4ce.firebaseapp.com",
  projectId: "ckite-ca4ce",
  storageBucket: "ckite-ca4ce.firebasestorage.app",
  messagingSenderId: "820553005891",
  appId: "1:820553005891:web:71e315d7817442efad4df6",
  measurementId: "G-E5Z3YLKVQ1"
};

// Initialize Firebase only once
let app;
let auth;

// Detect if the environment is React Native or Web
const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  if (isReactNative) {
    // React Native-specific auth persistence
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } else {
    // Web-specific auth persistence (defaults to localStorage)
    auth = getAuth(app);  // Default web behavior
  }
} else {
  // Get the already initialized app and auth instance
  app = getApps()[0];
  auth = getAuth(app);  // Using getAuth to avoid re-initialization
}

export { auth };  // Export the auth instance for use in other parts of your app
