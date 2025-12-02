const express = require('express');
const cors = require('cors');
const authRoute = require('./route/authRoute');
const userRoute = require('./route/userRoute');
const canchaRoute = require('./route/canchaRoute');
const reservaRoute = require('./route/reservaRoute');
const resenaRoute = require('./route/resenaRoute');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/api/auth', authRoute);

// Rutas protegidas según middleware dentro de cada route
app.use('/api/users', userRoute);
app.use('/api/canchas', canchaRoute);
app.use('/api/reservas', reservaRoute);
app.use('/api/resenas', resenaRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado' });
});

module.exports = app;
