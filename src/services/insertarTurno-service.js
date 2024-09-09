const ITRepository = require('../repositories/insertarTurno-repositories');

const insertTurno = async (idMedico, idPaciente, idArea, idEstadoTurno, Sintomas) => {
    try {
      return await ITRepository.insertTurno(idMedico, idPaciente, idArea, idEstadoTurno, Sintomas);
    } catch (error) {
      console.error('Error al obtener cantidad personas:', error);
      throw error;
    }
  }

  module.exports = { insertTurno };