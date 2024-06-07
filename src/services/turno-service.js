const Turno = require('./turno');
const TurnoRepository = require('./turno-repositories');

async function guardarNuevoTurno(turnoData) {
  try {
    const nuevoTurno = new Turno(...Turno.values(turnoData));
    const turnoGuardado = await TurnoRepository.guardarTurno(nuevoTurno);
    return turnoGuardado;
  } catch (error) {
    console.error('Error al guardar el nuevo turno:', error);
    throw error;
  }
}

module.exports = { guardarNuevoTurno };


