const express = require('express');
const { body } = require('express-validator');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/profile', userController.getProfile);

router.put('/profile',
  [
    body('nombre').optional().trim().notEmpty().withMessage('Nombre no puede quedar vacío'),
    body('password').optional().isLength({ min: 6 }).withMessage('Contraseña mínima 6 caracteres')
  ],
  validate,
  userController.updateProfile
);

module.exports = router;
