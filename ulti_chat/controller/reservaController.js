const reservaModel = require('../model/reservaModel');

exports.createReserva = async (req, res) => {
  try {
    const { cancha_id, fecha, hora_inicio, hora_fin } = req.body;
    const usuario_id = req.user.id;

    const solapada = await reservaModel.existsOverlap({ cancha_id, fecha, hora_inicio, hora_fin });
    if (solapada) {
      return res.status(400).json({ message: 'Ya hay reserva solapada' });
    }

    const id = await reservaModel.create({
      usuario_id,
      cancha_id,
      fecha,
      hora_inicio,
      hora_fin,
      estado: 'pendiente'
    });
    res.status(201).json({ message: 'Reserva creada', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getReservasUsuario = async (req, res) => {
  try {
    const reservas = await reservaModel.getByUsuario(req.user.id);
    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getReservasCancha = async (req, res) => {
  try {
    const reservas = await reservaModel.getByCancha(req.params.cancha_id);
    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateEstadoReserva = async (req, res) => {
  try {
    const { estado } = req.body;
    if (!['pendiente', 'confirmada', 'cancelada'].includes(estado)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }
    await reservaModel.updateEstado(req.params.id, estado);
    res.json({ message: 'Estado actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.cancelReserva = async (req, res) => {
  try {
    await reservaModel.cancel(req.params.id);
    res.json({ message: 'Reserva cancelada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
