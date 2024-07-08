const turnoRepository = require('../repositories/turno-repositories');
const { validarTurno } = require('../helpers/validaciones-helpers');

async function crearTurno(turno) {
  validarTurno(turno);
  return await turnoRepository.guardarTurno(turno);
}


module.exports = { crearTurno };



