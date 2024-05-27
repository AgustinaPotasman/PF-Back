import config from './src/configs/db-configs.js';
import pkg from 'pg';
const { Client } = pkg;

const client = require('../configs/db-config');

async function guardarTurno(turno) {
  const query = `
    INSERT INTO Turno (IdMedico, IdPaciente, TiempoDeEspera, IdArea, TurnosPrevios, IdEstadoTurno, FechaHora, Sintomas) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [
    turno.IdMedico,
    turno.IdPaciente,
    turno.TiempoDeEspera,
    turno.IdArea,
    turno.TurnosPrevios,
    turno.IdEstadoTurno,
    turno.FechaHora,
    turno.Sintomas,
  ];
  try {
    const { rows } = await client.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error('Error al guardar el turno en la base de datos: ' + error.message);
  }
}

export default guardarTurno;