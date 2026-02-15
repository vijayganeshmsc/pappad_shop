# Firebase Authentication Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create project"
3. Enter project name: `pappad-shop-auth`
4. Continue with default settings
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Under "Sign-in method", click "Email/Password"
4. Enable "Email/Password" provider
5. Click "Save"

## Step 3: Get Firebase Configuration

1. In Firebase dashboard, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. In the "Your apps" section, click the web icon (</>)
4. Enter app name: `Pappad Shop Web App`
5. Click "Register app"
6. Copy the Firebase configuration object (it looks like this):
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 4: Update Configuration File

1. Open `firebase-config.js` in your project
2. Replace the placeholder config with your actual Firebase configuration
3. Save the file

## Step 5: Test the Authentication

1. Open the home page in your browser
2. Click "Sign Up"
3. Fill the registration form
4. Submit the form
5. Check Firebase Console → Authentication → Users to see the new user

## Step 6: Test Sign In

1. Logout from the home page (click profile button)
2. Click "Sign Up" again
3. Click "Already a member? Sign In"
4. Enter the same email and password you used for registration
5. Submit the form
6. You should be logged in and redirected to the home page

## File Structure After Firebase Integration

```
user_pages/
├── home_page/
│   ├── js/
│   │   ├── components/
│   │   │   └── header.js (updated)
│   │   └── firebase-config.js (new)
│   └── index.html
├── login_page/
│   ├── Register/
│   │   └── Register.html (updated)
│   └── SignIn/
│       └── SignIn.html (updated)
└── firebase-setup-instructions.md (this file)
```

## Important Notes

- Make sure your Firebase project has Email/Password authentication enabled
- Keep your Firebase configuration secure (don't share it publicly)
- The authentication state will persist across browser sessions
- Users will be able to sign up, sign in, and logout seamlessly

## Troubleshooting

### "auth/weak-password" error
- Password must be at least 6 characters long

### "auth/email-already-in-use" error
- This email is already registered, try signing in instead

### "auth/user-not-found" error
- No account exists with this email, try registering first

### "auth/wrong-password" error
- The password is incorrect, check your credentials

### Configuration errors
- Make sure you copied the Firebase config correctly
- Check that all required fields are present
- Ensure your Firebase project is properly set up
