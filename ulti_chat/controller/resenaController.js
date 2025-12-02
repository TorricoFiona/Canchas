const resenaModel = require('../model/resenaModel');

exports.createResena = async (req, res) => {
  try {
    const { cancha_id, puntuacion, comentario } = req.body;
    if (puntuacion < 1 || puntuacion > 5) {
      return res.status(400).json({ message: 'Puntuación inválida' });
    }
    const id = await resenaModel.create({
      usuario_id: req.user.id,
      cancha_id,
      puntuacion,
      comentario
    });
    res.status(201).json({ message: 'Reseña creada', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getResenasCancha = async (req, res) => {
  try {
    const resenas = await resenaModel.getByCancha(req.params.cancha_id);
    res.json(resenas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
