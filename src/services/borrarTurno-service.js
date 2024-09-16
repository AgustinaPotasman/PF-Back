const BTRepository = require('../repositories/borrarTurno-repositories');

const cancelarTurno = async (id) => {
  try {
      const turnoEliminado = await BTRepository.cancelarTurno(id);
      if (!turnoEliminado) {
          throw new Error('Turno no encontrado');
      }
      return turnoEliminado;
  } catch (error) {
      console.error('Error al eliminar el turno:', error.message);
      throw error;
  }
};

module.exports = { cancelarTurno };
