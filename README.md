# Health & Habits Calendar Dashboard  

A minimalistic web app for tracking daily health, habits, mood, sleep, diet, and exercise.  
Built with **React.js**, **Next.js**, **Firebase**, and **Tailwind CSS**.  

---

## Features

- **Calendar Dashboard**:  
  Track daily entries for sleep, exercise, diet, mood, gratitude, and learning.  

- **Stats Table**:  
  View and analyze all entries in a sortable, scrollable table.  

- **Entry Graph**:  
  Visualize trends over time for activity, diet, sleep, and mood.  

- **Authentication**:  
  Secure sign-up and sign-in with Firebase Auth.  

- **Responsive Design**:  
  Clean, minimal UI with a soothing blue color palette.  

---

## Tech Stack  

- **Frontend**: Next.js, React, Tailwind CSS  
- **Backend**: Firebase Firestore, Firebase Auth  
- **Charts**: Recharts  

---

## Getting Started  

### 1. Clone the repo:
```bash
https://github.com/gitKevinW/Mental_And_Physical_Wellness_Application
cd Mental_And_Physical_Wellness_Application
```
### 2. Install dependencies:
```bash
npm install
```
### 3. Set up Firebase:
- Create a Firebase project.
- Add your Firebase config to .env.local:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
```
### 4. Run locally:
```bash
npm run dev
```

## Folder Structure

/src/app/_components   → Reusable React components (Calendar, Modal, Graph, Auth)
/src/app/home          → Calendar dashboard page
/src/app/stats         → Stats table page
/src/app/graph         → Entry graph page
/src/app/signup        → Sign-up page
/src/app/page.tsx      → Sign-in page

## License

MIT

## Credits

- date-fns for date utilities
- Recharts for graphing
- Firebase for backend services
