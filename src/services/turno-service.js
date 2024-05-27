const turnoRepository = require('../repositories/turno-repository');
const Turno = require('../entities/turno.js');

async function guardarTurno(turnoData) {
  try {
    const turno = new Turno(
      turnoData.IdMedico,
      turnoData.IdPaciente,
      turnoData.TiempoDeEspera,
      turnoData.IdArea,
      turnoData.TurnosPrevios,
      turnoData.IdEstadoTurno,
      turnoData.FechaHora,
      turnoData.Sintomas
    );

    const turnoGuardado = await turnoRepository.guardarTurno(turno);
    return turnoGuardado;
  } catch (error) {
    throw new Error('Error al guardar el turno: ' + error.message);
  }
}

export default guardarTurno;