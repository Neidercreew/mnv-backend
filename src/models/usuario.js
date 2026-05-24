const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  nivel: {
    type: String,
    enum: ['basico', 'intermedio', 'avanzado'],
    default: 'basico'
  },
  progreso: [
    {
      leccionId: String,
      completada: Boolean,
      fechaCompletada: Date
    }
  ],
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);