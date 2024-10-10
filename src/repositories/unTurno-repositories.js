const pool = require('../configs/db-configs');

const getUnTurno = async (id) => {
  try {
    const res = await pool.query(`
      SELECT p."Nombre", p."Apellido", p."DNI", p."Gmail", p."Telefono", t."idEstadoTurno", t."Sintomas"
      FROM public."Turno" t
      JOIN public."Paciente" p ON t."idPaciente" = p."Id"
      WHERE t."Id" = $1
    `, [id]);
    return res.rows[0]; 
  } catch (error) {
    console.error('Error al obtener el paciente por turno:', error.message);
    throw error;
  }
};

module.exports = {getUnTurno };
  