// =======================
// Firebase Configuration
// =======================
const firebaseConfig = {
  apiKey: "AIzaSyAED0FvAfWyLQNaapLNqc4CN9BQPBeq8vU",
  authDomain: "kristoauth-1d71b.firebaseapp.com",
  projectId: "kristoauth-1d71b",
  storageBucket: "kristoauth-1d71b.firebasestorage.app",
  messagingSenderId: "1097863662117",
  appId: "1:1097863662117:web:f72610e66c619736f08dcc",
  measurementId: "G-JCFCD0GTK9"
};

// =======================
// Gemini AI Configuration
// =======================
// Note: Use your Gemini API key (free or limited plan)
const GEMINI_API_KEY = "AIzaSyAz_NygjAGY0VS4Eku9oGCxHV2duHutlCY";

const GEMINI_MODELS = {
    primary: "Gemini-2.5-flash",     // Main model
    secondary: "Gemini-2.5-flash"    // Fallback model if primary fails
};

// =======================
// Optional settings
// =======================
const MAX_OUTPUT_TOKENS = 10; // Max tokens for AI output
const DAILY_TICKET_LIMIT = 100;   // Max AI generations per day per user
const MONTHLY_TICKETS = 3000;     // Monthly ticket allocation
