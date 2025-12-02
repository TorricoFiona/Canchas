require('dotenv').config();
const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

db.getConnection((err, conn) => {
  if (err) {
    console.error('Error conectando a la DB:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Conectado a la base de datos');
    conn.release();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  }
});
