# Supabase Setup Instructions

This guide will help you set up Supabase authentication for your Saravana & Co Papads shop.

## Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Click "Start your project"
3. Sign up or log in with your account
4. Create a new project:
   - Enter a project name (e.g., "pappad-shop")
   - Set a secure password
   - Choose your region (preferably closest to your users)
5. Wait for the project to be created

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Project Settings** (gear icon)
2. Click on **API** in the left sidebar
3. You'll see:
   - **Project URL** - Copy this
   - **anon public** - Copy the key (this is your ANON_KEY)

## Step 3: Update Configuration Files

Update the following files with your Supabase credentials:

### For Home Page
Update: `user_pages/home_page/js/supabase-config.js`

```javascript
const SUPABASE_URL = 'your-project-url-here';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### For Sign-In Page
Update: `user_pages/login_page/supabase-config.js`

```javascript
const SUPABASE_URL = 'your-project-url-here';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

## Step 4: Set Up Authentication

1. In your Supabase dashboard, go to **Authentication** in the left sidebar
2. Click on **Providers**
3. Ensure "Email" is enabled (it should be by default)
4. Go to **Settings** and configure:
   - Site URL: Your production website URL
   - Redirect URLs: Add your authentication callback URLs

## Step 5: Create Authentication Policies (Optional)

1. Go to **SQL Editor** in Supabase
2. Run queries to set up Row Level Security (RLS) on your tables (if you have user-specific data)
3. This ensures users can only access their own data

## Step 6: Test the Integration

1. Open your home page (`user_pages/home_page/index.html`)
2. Click the "Sign in" button
3. If you don't have an account:
   - Go to the "Register" link
   - Create a new account with your email and password
4. Sign in with your credentials
5. You should see the "Sign in" button change to a profile icon

## Features Implemented

✅ **Sign-In Page**: Users can log in with email and password
✅ **Home Page**: Shows login status and provides logout functionality
✅ **Session Management**: Maintains user session in localStorage
✅ **Error Handling**: Displays helpful error messages
✅ **Authentication Utility**: `supabase-auth.js` provides reusable auth functions

## File Structure

```
user_pages/
├── home_page/
│   ├── js/
│   │   ├── supabase-config.js (⬅️ UPDATE WITH YOUR CREDENTIALS)
│   │   ├── main.js
│   │   ├── components/
│   │   │   └── header.js (updated for Supabase)
│   │   └── utils/
│   │       └── supabase-auth.js (new auth utility)
│   └── index.html (updated with Supabase SDK)
│
└── login_page/
    ├── SignIn/
    │   └── SignIn.html (updated for Supabase)
    └── supabase-config.js (⬅️ UPDATE WITH YOUR CREDENTIALS)
```

## Troubleshooting

### "Supabase is not defined"
Make sure you've included the Supabase SDK CDN link in your HTML:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

### "Invalid login credentials"
- Double-check your email and password
- Ensure your email is verified (check Supabase dashboard)
- If you haven't created an account, use the Register page first

### "CORS errors"
- Go to Supabase Project Settings > API
- Add your domain to the allowed CORS origins

### Still having issues?
1. Check the browser console (F12) for error messages
2. Check Supabase dashboard logs
3. Verify your credentials are correct
4. Ensure your Supabase project is active (not paused)

## Next Steps

1. **Add Sign-Up Page**: Create a register page with password confirmation
2. **User Profile**: Add a user profile page to update user information
3. **Password Reset**: Implement forgot password functionality
4. **Email Verification**: Send verification emails to new users
5. **OAuth**: Add social login (Google, GitHub, etc.)
6. **Two-Factor Authentication**: Enhance security with 2FA

## Security Best Practices

⚠️ **Important**: Keep your `supabase-config.js` files secure:
- The ANON_KEY is meant to be public (used in frontend)
- Never expose your SERVICE_ROLE_KEY on the frontend
- Use Row Level Security (RLS) to protect your data
- Set up proper authentication policies in Supabase

---

For more information, visit the [Supabase Documentation](https://supabase.com/docs)
