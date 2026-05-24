const express = require('express');
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuario,
  actualizarNivel,
  guardarProgreso
} = require('../controllers/usuarioController');

// POST /api/usuarios - crear usuario nuevo
router.post('/', crearUsuario);

// GET /api/usuarios/:id - obtener usuario por id
router.get('/:id', obtenerUsuario);

// PUT /api/usuarios/:id/nivel - actualizar nivel
router.put('/:id/nivel', actualizarNivel);

// PUT /api/usuarios/:id/progreso - guardar progreso de leccion
router.put('/:id/progreso', guardarProgreso);

module.exports = router;