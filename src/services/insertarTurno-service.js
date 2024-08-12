const ITRepository = require('../repositories/insertarTurno-repositories');

const insertTurno = async (idMedico, idPaciente, idArea, idEstadoTurno, FechaHora, Sintomas) => {
    try {
      return await ITRepository.insertTurno(idMedico, idPaciente, idArea, idEstadoTurno, FechaHora, Sintomas);
    } catch (error) {
      console.error('Error al obtener cantidad personas:', error);
      throw error;
    }
  }

  module.exports = { insertTurno };