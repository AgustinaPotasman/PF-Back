const pool = require('../configs/db-configs');
const Turno = require('../entities/turno');

async function guardarTurno(turno) {
  const { IdMedico, IdPaciente, TiempoDeEspera, IdArea, TurnosPrevios, IdEstadoTurno, FechaHora, Sintomas } = turno;
  const query = `
  INSERT INTO "Turno" 
  ("IdMedico", "IdPaciente", "TiempoDeEspera", "IdArea", "TurnosPrevios", "IdEstadoTurno", "FechaHora", "Sintomas") 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
  RETURNING *`;
  const values = [IdMedico, IdPaciente, TiempoDeEspera, IdArea, TurnosPrevios, IdEstadoTurno, FechaHora, Sintomas];

  try {
    const { rows } = await pool.query(query, values);
    return new Turno(...Turno.values(rows[0]));
  } catch (error) {
    console.error('Error al guardar el turno:', error);
    throw error;
  }
}

module.exports = { guardarTurno };
