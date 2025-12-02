const db = require('../config/db');

exports.getAll = async (filters = {}) => {
  let sql = 'SELECT * FROM cancha WHERE 1=1';
  const params = [];

  if (filters.tipo) {
    sql += ' AND tipo = ?';
    params.push(filters.tipo);
  }
  if (filters.precioMax !== undefined) {
    sql += ' AND precioHora <= ?';
    params.push(filters.precioMax);
  }
  if (filters.disponibilidad !== undefined) {
    sql += ' AND disponibilidad = ?';
    params.push(filters.disponibilidad ? 1 : 0);
  }

  const [rows] = await db.promise().query(sql, params);
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM cancha WHERE id = ?',
    [id]
  );
  return rows[0];
};

exports.create = async (data) => {
  const { nombre, direccion, tipo, precioHora, disponibilidad, administrador_id } = data;
  const [result] = await db.promise().query(
    'INSERT INTO cancha (nombre, direccion, tipo, precioHora, disponibilidad, administrador_id) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, direccion, tipo, precioHora, disponibilidad ? 1 : 0, administrador_id]
  );
  return result.insertId;
};

exports.update = async (id, data) => {
  const sets = [];
  const params = [];

  if (data.nombre !== undefined) {
    sets.push('nombre = ?'); params.push(data.nombre);
  }
  if (data.direccion !== undefined) {
    sets.push('direccion = ?'); params.push(data.direccion);
  }
  if (data.tipo !== undefined) {
    sets.push('tipo = ?'); params.push(data.tipo);
  }
  if (data.precioHora !== undefined) {
    sets.push('precioHora = ?'); params.push(data.precioHora);
  }
  if (data.disponibilidad !== undefined) {
    sets.push('disponibilidad = ?'); params.push(data.disponibilidad ? 1 : 0);
  }

  if (sets.length === 0) return;

  const sql = `UPDATE cancha SET ${sets.join(', ')} WHERE id = ?`;
  params.push(id);
  await db.promise().query(sql, params);
};

exports.delete = async (id) => {
  await db.promise().query('DELETE FROM cancha WHERE id = ?', [id]);
};
