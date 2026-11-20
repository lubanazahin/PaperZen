# 🔥 Firebase Authentication - Complete Setup Guide

## Students দের জন্য Step-by-Step Guide

---

## 📌 Part 1: Firebase Console এ কি কি করতে হবে

### Step 1: Firebase Project Create করা
1. Browser এ যাও: **https://console.firebase.google.com/**
2. Google Account দিয়ে login করো
3. **"Create a project"** বা **"Add project"** button এ click করো
4. Project এর একটা নাম দাও (যেমন: `my-auth-app`)
5. Google Analytics disable করো (এই project এ দরকার নেই) → **Continue**
6. Project ready হলে **"Continue"** click করো

### Step 2: Web App Register করা (Config পাওয়ার জন্য)
1. Project Dashboard এ আসবে
2. **Web icon (</>)** তে click করো (HTML tag icon)
3. App এর নাম দাও (যেমন: `my-auth-web`)
4. **"Register app"** click করো
5. 🎯 **Firebase config object দেখাবে** - এটা COPY করো!
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "my-auth-app.firebaseapp.com",
     projectId: "my-auth-app",
     storageBucket: "my-auth-app.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456..."
   };
   ```
6. এই config টা তোমার project এর `src/firebase/firebase.config.js` file এ paste করো
7. **"Continue to console"** click করো

### Step 3: Authentication Enable করা
1. Left sidebar থেকে **"Build"** → **"Authentication"** এ click করো
2. **"Get started"** button click করো
3. **"Sign-in method"** tab এ যাও

### Step 4: Email/Password Provider Enable করা
1. **"Email/Password"** এ click করো
2. **"Enable"** toggle ON করো
3. **"Save"** click করো
4. ✅ Done! Email/Password login ready

### Step 5: Google Provider Enable করা
1. **"Add new provider"** click করো
2. **"Google"** select করো
3. **"Enable"** toggle ON করো
4. **Project support email** select করো (তোমার Gmail)
5. **"Save"** click করো
6. ✅ Done! Google login ready

### Step 6: GitHub Provider Enable করা (একটু extra step আছে)

#### 6a: GitHub এ OAuth App create করো
1. যাও: **https://github.com/settings/developers**
2. **"OAuth Apps"** tab → **"New OAuth App"** click করো
3. Form পূরণ করো:
   - **Application name:** `My Firebase Auth App`
   - **Homepage URL:** `http://localhost:5173`
   - **Authorization callback URL:** Firebase Console থেকে copy করো (Step 6b তে পাবে)
4. **"Register application"** click করো
5. 🎯 **Client ID** copy করো
6. **"Generate a new client secret"** click করো → **Client Secret** copy করো

#### 6b: Firebase Console এ GitHub setup
1. Firebase Console → Authentication → Sign-in method
2. **"Add new provider"** → **"GitHub"** select করো
3. **"Enable"** toggle ON করো
4. **Client ID** paste করো (GitHub থেকে copy করা)
5. **Client Secret** paste করো
6. 🎯 **Authorization callback URL** টা copy করো (এটা GitHub OAuth App এ paste করতে হবে)
7. GitHub এ ফিরে যাও → OAuth App edit করো → **Authorization callback URL** paste করো
8. Firebase Console এ **"Save"** click করো
9. ✅ Done! GitHub login ready

---

## 📌 Part 2: Project Structure (ফাইলের গঠন)

```
firebase-auth-basic/
├── src/
│   ├── components/
│   │   ├── Home.jsx          ← Home page (Profile dekhabe)
│   │   ├── Login.jsx         ← Login form (Email, Google, GitHub)
│   │   ├── Navbar.jsx        ← Navigation bar
│   │   └── Register.jsx      ← Registration form
│   ├── firebase/
│   │   └── firebase.config.js ← Firebase configuration
│   ├── providers/
│   │   └── AuthProvider.jsx   ← Auth Context (Main Brain!)
│   ├── App.jsx               ← Routing setup
│   ├── main.jsx              ← Entry point (AuthProvider wrap)
│   └── index.css             ← Basic styling
├── package.json
└── README.md (this file)
```

---

## 📌 Part 3: Code Flow বোঝা (কিভাবে কাজ করে)

### 🔄 Overall Flow:
```
main.jsx
  └── AuthProvider (Context - sob auth logic ekhane)
        └── App.jsx (BrowserRouter - Routing)
              ├── Navbar (conditional: logged in / logged out)
              └── Routes
                    ├── "/" → Home.jsx
                    ├── "/login" → Login.jsx
                    └── "/register" → Register.jsx
```

### 📝 Registration Flow:
```
User fills form → handleRegister() → createUserWithEmailAndPassword(auth, email, password)
  → Firebase e account create hoy → onAuthStateChanged trigger hoy → user state update
```

### 🔑 Login Flow (Email/Password):
```
User fills form → handleLogin() → signInWithEmailAndPassword(auth, email, password)
  → Firebase verify kore → onAuthStateChanged trigger → user state update → navigate("/")
```

### 🔵 Google/GitHub Login Flow:
```
User clicks button → signInWithPopup(auth, provider)
  → Popup opens → User selects account → Firebase verify → onAuthStateChanged → navigate("/")
```

### 🚪 Logout Flow:
```
User clicks Logout → signOut(auth) → onAuthStateChanged trigger → user = null → UI update
```

---

## 📌 Part 4: Key Concepts (মূল ধারণা)

### 1. Context API কেন ব্যবহার করছি?
- Authentication data (user info) পুরো app এ দরকার
- Props drilling (parent→child→grandchild) avoid করার জন্য
- একবার AuthProvider এ define করলে, যেকোনো component এ `useContext(AuthContext)` দিয়ে access পাওয়া যায়

### 2. onAuthStateChanged কি?
- এটা Firebase এর একটা **observer/listener**
- এটা continuously monitor করে user logged in আছে কিনা
- Page refresh করলেও user logged in থাকে (Firebase নিজেই manage করে)
- যখনই auth state change হয় (login/logout), callback function trigger হয়

### 3. signInWithPopup কি?
- এটা একটা popup window open করে
- User সেখানে Google/GitHub account select করে
- Firebase বাকি সব handle করে (token, verification)
- Return এ user object আসে

### 4. Loading State কেন?
- Firebase check করতে একটু সময় লাগে user logged in কিনা
- ঐ সময়টায় loading=true রাখি
- না করলে, page load হওয়ার সময় একটু flicker দেখাবে

---

## 📌 Part 5: Run করার নিয়ম

```bash
# Terminal এ:
npm run dev
```

Browser এ যাও: **http://localhost:5173**

---

## 📌 Part 6: Common Errors & Solutions

| Error | Solution |
|-------|----------|
| `auth/email-already-in-use` | এই email দিয়ে আগেই account আছে |
| `auth/wrong-password` | Password ভুল দিয়েছো |
| `auth/user-not-found` | এই email দিয়ে কোনো account নেই |
| `auth/popup-closed-by-user` | User popup বন্ধ করে দিয়েছে |
| `auth/invalid-api-key` | Firebase config এর API key ভুল |
| GitHub login not working | Callback URL ঠিকমত set হয়নি |

---

## ⚠️ Important Notes:
1. **firebase.config.js** এ তোমার নিজের config values বসাও (Firebase Console থেকে)
2. **GitHub login** এর জন্য GitHub OAuth App আলাদা করে create করতে হবে
3. Password minimum **6 characters** হতে হবে (Firebase requirement)
4. `.env` file এ config রাখা best practice (production এর জন্য)
