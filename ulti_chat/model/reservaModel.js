const db = require('../config/db');

exports.create = async ({ usuario_id, cancha_id, fecha, hora_inicio, hora_fin, estado }) => {
  const [result] = await db.promise().query(
    'INSERT INTO reserva (usuario_id, cancha_id, fecha, hora_inicio, hora_fin, estado) VALUES (?, ?, ?, ?, ?, ?)',
    [usuario_id, cancha_id, fecha, hora_inicio, hora_fin, estado]
  );
  return result.insertId;
};

exports.getById = async (id) => {
  const [rows] = await db.promise().query('SELECT * FROM reserva WHERE id = ?', [id]);
  return rows[0];
};

exports.getByUsuario = async (usuario_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM reserva WHERE usuario_id = ? ORDER BY fecha DESC, hora_inicio DESC',
    [usuario_id]
  );
  return rows;
};

exports.getByCancha = async (cancha_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM reserva WHERE cancha_id = ? ORDER BY fecha DESC, hora_inicio DESC',
    [cancha_id]
  );
  return rows;
};

exports.updateEstado = async (id, estado) => {
  await db.promise().query('UPDATE reserva SET estado = ? WHERE id = ?', [estado, id]);
};

exports.cancel = async (id) => {
  await db.promise().query('UPDATE reserva SET estado = "cancelada" WHERE id = ?', [id]);
};

exports.existsOverlap = async ({ cancha_id, fecha, hora_inicio, hora_fin }) => {
  const [rows] = await db.promise().query(
    `SELECT COUNT(*) as cnt FROM reserva
     WHERE cancha_id = ? AND fecha = ? AND estado IN ('pendiente','confirmada')
       AND (
         (hora_inicio < ? AND hora_fin > ?) OR
         (hora_inicio >= ? AND hora_inicio < ?)
       )`,
    [cancha_id, fecha, hora_fin, hora_inicio, hora_inicio, hora_fin]
  );
  return rows[0].cnt > 0;
};
