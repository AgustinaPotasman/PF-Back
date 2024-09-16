const pool = require('../configs/db-configs');

const insertTurno = async (idMedico, idPaciente, idArea, idEstadoTurno, Sintomas) => {
  try {
    const res = await pool.query(`
        INSERT INTO public."Turno"(
            "idMedico", "idPaciente", "idArea", "idEstadoTurno", "Sintomas")
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING "Id"; 
    `, [idMedico, idPaciente, idArea, idEstadoTurno, Sintomas]);
    return res.rows[0]; // Devuelve el ID del turno
  } catch (error) {
    console.error('Error al insertar el turno:', error.message);
    throw error;
  }
};

module.exports = { insertTurno };

