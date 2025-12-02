import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Canchas from './pages/Canchas'
import Reservas from './pages/Reservas'

export default function App() {
  // Aquí puedes manejar autenticación
  const [user, setUser] = React.useState(null)

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Canchas user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/reservas" element={user ? <Reservas user={user} /> : <Navigate to="/login"/>} />
      </Routes>
    </Router>
  )
}