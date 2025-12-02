const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { nombre, email, password, tipo } = req.body;
    const existing = await userModel.getByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'Email ya registrado' });
    }
    const hash = await bcrypt.hash(password, 10);
    const userId = await userModel.create({ nombre, email, password: hash, tipo });
    return res.status(201).json({ message: 'Usuario creado', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.getByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const valid = await bcrypt.compare(password, user.contraseña);
    if (!valid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const payload = { id: user.id, tipo: user.tipo };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, tipo: user.tipo } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
