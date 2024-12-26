import { BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from '@/pages/home'
import Login from '@/pages/login'
import Register from '@/pages/register'

import ProtectedRoute from '@/components/protectedRoute'
import AuthStateHandler from '@/components/authHandler'

import './App.css'

function App() {
  return (
    <BrowserRouter>
    <AuthStateHandler />
     <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      </Routes>
    </BrowserRouter>
  )
}

export default App


/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADhzUNqJW_CryBey7Yhfx4iionN5Ghfj8",
  authDomain: "symstax-a017a.firebaseapp.com",
  projectId: "symstax-a017a",
  storageBucket: "symstax-a017a.firebasestorage.app",
  messagingSenderId: "94693017291",
  appId: "1:94693017291:web:30a98a36a5bd12cd26bd4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); */