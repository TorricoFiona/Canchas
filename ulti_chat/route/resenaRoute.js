const express = require('express');
const { body } = require('express-validator');
const resenaController = require('../controller/resenaController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/cancha/:cancha_id', resenaController.getResenasCancha);

router.use(authMiddleware);

router.post('/',
  [
    body('cancha_id').isInt(),
    body('puntuacion').isInt({ min: 1, max: 5 }).withMessage('Puntuación inválida'),
    body('comentario').optional().trim()
  ],
  validate,
  resenaController.createResena
);

module.exports = router;
