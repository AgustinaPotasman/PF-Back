const UTRepository = require('../repositories/unTurno-repositories');

const getUnTurno = async (id) => {
    try {
      return await UTRepository.getUnTurno(id);
    } catch (error) {
      console.error('Error al obtener un turno:', error);
      throw error;
    }
  }

  module.exports = { getUnTurno };