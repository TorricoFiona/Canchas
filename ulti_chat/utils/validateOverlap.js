const reservaModel = require('../models/reservaModel');

async function isOverlapping(cancha_id, fecha, hora_inicio, hora_fin) {
  const overlaps = await reservaModel.findOverlappingReservations(
    cancha_id, fecha, hora_inicio, hora_fin
  );
  return overlaps.length > 0;
}

module.exports = { isOverlapping };
