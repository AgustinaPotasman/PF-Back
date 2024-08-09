const ETRepository = require('../repositories/ActualizarET-repositories');

const actualizarEstadoTurno = async (idTurno, nuevoEstadoId) => {
  try {
    return await ETRepository.actualizarEstadoTurno(idTurno, nuevoEstadoId);
  } catch (error) {
    console.error('Error al actualizar el turno:', error);
    throw error;
  }
};

module.exports = { actualizarEstadoTurno };
