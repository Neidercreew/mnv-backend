const Usuario = require('../models/usuario');

// Crear usuario nuevo
const crearUsuario = async (req, res) => {
  try {
    const { nombre, nivel } = req.body;
    const usuario = new Usuario({ nombre, nivel });
    await usuario.save();
    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuarioId: usuario._id, // importante para Flutter
      usuario
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error creando usuario', error });
  }
};

// Obtener usuario por ID
const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error obteniendo usuario', error });
  }
};

// Actualizar nivel del usuario
const actualizarNivel = async (req, res) => {
  try {
    const { nivel } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nivel },
      { new: true }
    );
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Nivel actualizado', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error actualizando nivel', error });
  }
};

// Guardar progreso de una lección (función original)
const guardarProgreso = async (req, res) => {
  try {
    const { leccionId } = req.body;
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const leccionExiste = usuario.progreso.find(
      p => p.leccionId === leccionId
    );

    if (!leccionExiste) {
      usuario.progreso.push({
        leccionId,
        completada: true,
        fechaCompletada: new Date()
      });
      await usuario.save();
    }

    res.json({ mensaje: 'Progreso guardado', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error guardando progreso', error });
  }
};

// NUEVO: Guardar paso individual del tutorial
const guardarPaso = async (req, res) => {
  try {
    const { leccionId, paso, completada } = req.body; // 👈 agrega completada
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const leccionExiste = usuario.progreso.find(
      p => p.leccionId === leccionId
    );

    if (leccionExiste) {
      if (paso > leccionExiste.paso) {
        leccionExiste.paso = paso;
      }
      // Marca completada si llegó al último paso O si Flutter lo indica explícitamente
      if (paso >= 6 || completada === true) {
        leccionExiste.completada = true;
        leccionExiste.fechaCompletada = new Date();
      }
    } else {
      usuario.progreso.push({
        leccionId,
        paso,
        completada: paso >= 6 || completada === true,
        fechaCompletada: (paso >= 6 || completada === true) ? new Date() : null,
      });
    }

    await usuario.save();
    res.json({ mensaje: 'Paso guardado', paso });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error guardando paso', error });
  }
};

//  NUEVO: Obtener progreso completo (para el dashboard)
const obtenerProgreso = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({
      nombre: usuario.nombre,
      nivel: usuario.nivel,
      progreso: usuario.progreso,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error obteniendo progreso', error });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuario,
  actualizarNivel,
  guardarProgreso,
  guardarPaso,     //  nuevo
  obtenerProgreso, //  nuevo
};