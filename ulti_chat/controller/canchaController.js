const canchaModel = require('../model/canchaModel');

exports.getAllCanchas = async (req, res) => {
  try {
    const filters = {
      tipo: req.query.tipo,
      precioMax: req.query.precioMax ? Number(req.query.precioMax) : undefined,
      disponibilidad: req.query.disponibilidad !== undefined ? (req.query.disponibilidad === 'true') : undefined
    };
    const canchas = await canchaModel.getAll(filters);
    res.json(canchas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCanchaById = async (req, res) => {
  try {
    const cancha = await canchaModel.getById(req.params.id);
    if (!cancha) {
      return res.status(404).json({ message: 'Cancha no encontrada' });
    }
    res.json(cancha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createCancha = async (req, res) => {
  try {
    // solo administradores pueden crear (esto lo controla el middleware)
    const data = {
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      tipo: req.body.tipo,
      precioHora: req.body.precioHora,
      disponibilidad: req.body.disponibilidad,
      administrador_id: req.user.id
    };
    const id = await canchaModel.create(data);
    res.status(201).json({ message: 'Cancha creada', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateCancha = async (req, res) => {
  try {
    const cancha = await canchaModel.getById(req.params.id);
    if (!cancha) {
      return res.status(404).json({ message: 'Cancha no encontrada' });
    }
    if (cancha.administrador_id !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    await canchaModel.update(req.params.id, req.body);
    res.json({ message: 'Cancha actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCancha = async (req, res) => {
  try {
    const cancha = await canchaModel.getById(req.params.id);
    if (!cancha) {
      return res.status(404).json({ message: 'Cancha no encontrada' });
    }
    if (cancha.administrador_id !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    await canchaModel.delete(req.params.id);
    res.json({ message: 'Cancha eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
