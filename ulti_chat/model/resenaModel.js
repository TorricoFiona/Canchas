const db = require('../config/db');

exports.create = async ({ usuario_id, cancha_id, puntuacion, comentario }) => {
  const [result] = await db.promise().query(
    'INSERT INTO resena (usuario_id, cancha_id, puntuacion, comentario) VALUES (?, ?, ?, ?)',
    [usuario_id, cancha_id, puntuacion, comentario]
  );
  return result.insertId;
};

exports.getByCancha = async (cancha_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM resena WHERE cancha_id = ? ORDER BY id DESC',
    [cancha_id]
  );
  return rows;
};
