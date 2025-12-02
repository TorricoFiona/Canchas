const db = require('../config/db');

exports.create = async ({ nombre, email, password, tipo }) => {
  const [result] = await db.promise().query(
    'INSERT INTO usuario (nombre, email, contraseña, tipo) VALUES (?, ?, ?, ?)',
    [nombre, email, password, tipo]
  );
  return result.insertId;
};

exports.getByEmail = async (email) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM usuario WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0];
};

exports.getById = async (id) => {
  const [rows] = await db.promise().query(
    'SELECT id, nombre, email, tipo FROM usuario WHERE id = ?',
    [id]
  );
  return rows[0];
};

exports.update = async (id, { nombre, password }) => {
  const sets = [];
  const params = [];

  if (nombre !== undefined) {
    sets.push('nombre = ?');
    params.push(nombre);
  }
  if (password !== undefined) {
    sets.push('contraseña = ?');
    params.push(password);
  }
  if (sets.length === 0) return;

  const sql = `UPDATE usuario SET ${sets.join(', ')} WHERE id = ?`;
  params.push(id);
  await db.promise().query(sql, params);
};
