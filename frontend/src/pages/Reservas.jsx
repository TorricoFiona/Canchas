import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Reservas({ user }) {
  const [reservas, setReservas] = useState([])

  useEffect(() => {
    api.get(`/api/usuarios/${user.id}/reservas`)
      .then(res => setReservas(res.data))
      .catch(() => setReservas([]))
  }, [user])

  return (
    <div>
      <h2>Mis Reservas</h2>
      <ul>
        {reservas.map(r => (
          <li key={r.id}>
            Cancha: {r.cancha} Fecha: {r.fecha} Hora: {r.hora}
          </li>
        ))}
      </ul>
    </div>
  )
}