const ETRepository = require('../repositories/paciente-repositorires.js');

const obtenerPaciente = async (idTurno) => {
  return await ETRepository.obtenerPaciente(idTurno);
};

module.exports = { obtenerPaciente };