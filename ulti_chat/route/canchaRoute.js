const express = require('express');
const { body, query } = require('express-validator');
const canchaController = require('../controller/canchaController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/',
  [
    query('tipo').optional().trim(),
    query('precioMax').optional().isFloat({ min: 0 }),
    query('disponibilidad').optional().isBoolean()
  ],
  validate,
  canchaController.getAllCanchas
);

router.get('/:id', canchaController.getCanchaById);

router.use(authMiddleware);

router.post('/',
  [
    body('nombre').trim().notEmpty(),
    body('direccion').trim().notEmpty(),
    body('tipo').trim().notEmpty(),
    body('precioHora').isFloat({ min: 0 }),
    body('disponibilidad').isBoolean()
  ],
  validate,
  canchaController.createCancha
);

router.put('/:id',
  [
    body('nombre').optional().trim().notEmpty(),
    body('direccion').optional().trim().notEmpty(),
    body('tipo').optional().trim().notEmpty(),
    body('precioHora').optional().isFloat({ min: 0 }),
    body('disponibilidad').optional().isBoolean()
  ],
  validate,
  canchaController.updateCancha
);

router.delete('/:id', canchaController.deleteCancha);

module.exports = router;
