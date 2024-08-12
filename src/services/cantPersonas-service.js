const CPRepository = require('../repositories/cantPersonas-repositories');

const contarPersonasEnArea = async (idArea) => {
    try {
      return await CPRepository.contarPersonasEnArea(idArea);
    } catch (error) {
      console.error('Error al obtener cantidad personas:', error);
      throw error;
    }
  }

  module.exports = { contarPersonasEnArea };
