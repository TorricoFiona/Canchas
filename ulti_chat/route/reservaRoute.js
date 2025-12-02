const express = require('express');
const { body } = require('express-validator');
const reservaController = require('../controller/reservaController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/',
  [
    body('cancha_id').isInt(),
    body('fecha').isISO8601().withMessage('Fecha inválida'),
    body('hora_inicio').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Hora inicio inválida'),
    body('hora_fin').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Hora fin inválida')
  ],
  validate,
  reservaController.createReserva
);

router.get('/', reservaController.getReservasUsuario);

router.get('/cancha/:cancha_id', reservaController.getReservasCancha);

router.put('/:id/estado', reservaController.updateEstadoReserva);

router.put('/:id/cancelar', reservaController.cancelReserva);

module.exports = router;
