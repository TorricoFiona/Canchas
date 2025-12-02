const express = require('express');
const { body } = require('express-validator');
const authController = require('../controller/authController');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.post('/register',
  [
    body('nombre').trim().notEmpty().withMessage('Nombre requerido'),
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Contraseña mínima 6 caracteres'),
    body('tipo').optional().isIn(['jugador', 'administrador'])
  ],
  validate,
  authController.register
);

router.post('/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('Contraseña requerida')
  ],
  validate,
  authController.login
);

module.exports = router;
