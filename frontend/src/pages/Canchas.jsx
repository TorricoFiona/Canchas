import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Canchas({ user }) {
  const [canchas, setCanchas] = useState([])

  useEffect(() => {
    api.get('/api/canchas') // Ajusta el endpoint a tu backend real
      .then(res => setCanchas(res.data))
      .catch(() => setCanchas([]))
  }, [])

  return (
    <div>
      <h2>Canchas disponibles</h2>
      <ul>
        {canchas.map(c => (
          <li key={c.id}>
            {c.nombre} - {c.ubicacion}
            {user && 
              <button /* Aquí agregar lógica para reservar */>
                Reservar
              </button>
            }
          </li>
        ))}
      </ul>
    </div>
  )
}