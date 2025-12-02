import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login({ setUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/api/login', { username, password })
      setUser(res.data.user)
      navigate('/')
    } catch (err) {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
      {error && <p style={{color:'red'}}>{error}</p>}
    </form>
  )
}