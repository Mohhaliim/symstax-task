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