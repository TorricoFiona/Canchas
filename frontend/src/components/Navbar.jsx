import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate()
  const logout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <nav>
      <Link to="/">Canchas</Link>
      { user ? (
        <>
          <Link to="/reservas">Mis Reservas</Link>
          <button onClick={logout}>Salir</button>
          <span>Hola, {user.username}</span>
        </>
      ) : (
        <Link to="/login">Ingresar</Link>
      )}
    </nav>
  )
}