const pool = require('../configs/db-configs');

const obtenerListaEsperaPorArea = async (idArea) => {
  try {
    const res = await pool.query(`
      SELECT t."Id" AS idTurno, p."Nombre" AS PacienteNombre, a."Especialidad" AS Area, m."Nombre" AS MedicoNombre
      FROM public."Turno" t
      INNER JOIN public."Paciente" p ON t."idPaciente" = p."Id"
      INNER JOIN public."Medico" m ON t."idMedico" = m."Id"
      INNER JOIN public."Area" a ON t."idArea" = a."Id"
      WHERE t."idArea" = $1
    `, [idArea]);
    return res.rows;
  } catch (error) {
    console.error('Error al obtener la lista de espera:', error.message);
    throw error;
  }
};

module.exports = { obtenerListaEsperaPorArea };


