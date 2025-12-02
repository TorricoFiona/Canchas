const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.getProfile = async (req, res) => {
  try {
    const user = await userModel.getById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, password } = req.body;
    const data = {};
    if (nombre) data.nombre = nombre;
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    await userModel.update(req.user.id, data);
    res.json({ message: 'Perfil actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
