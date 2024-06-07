const pool = require('./db-configs');
const Turno = require('./turno');

async function guardarTurno(turno) {
  const { idMedico, idPaciente, tiempoDeEspera, idArea, turnosPrevios, idEstadoTurno, fechaHora, sintomas } = turno;
  const query = 'INSERT INTO "Turno" ("IdMedico", "IdPaciente", "TiempoDeEspera", "IdArea", "TurnosPrevios", "IdEstadoTurno", "FechaHora", "Sintomas") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const values = [idMedico, idPaciente, tiempoDeEspera, idArea, turnosPrevios, idEstadoTurno, fechaHora, sintomas];

  try {
    const { rows } = await pool.query(query, values);
    return new Turno(...Turno.values(rows[0]));
  } catch (error) {
    console.error('Error al guardar el turno:', error);
    throw error;
  }
}

export default { guardarTurno };