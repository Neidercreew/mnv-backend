const express = require('express');
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuario,
  actualizarNivel,
  guardarProgreso,
  guardarPaso,      // 👈 nuevo
  obtenerProgreso,  // 👈 nuevo
} = require('../controllers/usuarioController');

// POST /api/usuarios - crear usuario nuevo
router.post('/', crearUsuario);

// GET /api/usuarios/:id - obtener usuario por id
router.get('/:id', obtenerUsuario);

// PUT /api/usuarios/:id/nivel - actualizar nivel
router.put('/:id/nivel', actualizarNivel);

// PUT /api/usuarios/:id/progreso - guardar progreso de leccion
router.put('/:id/progreso', guardarProgreso);

// POST /api/usuarios/:id/paso - guardar paso individual 👈 nuevo
router.post('/:id/paso', guardarPaso);

// GET /api/usuarios/:id/progreso - obtener progreso para dashboard 👈 nuevo
router.get('/:id/progreso', obtenerProgreso);

module.exports = router;