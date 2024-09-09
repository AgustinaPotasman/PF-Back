const pool = require('../configs/db-configs');


const insertTurno = async (idMedico, idPaciente, idArea, idEstadoTurno, Sintomas) => {
  try {
      const res = await pool.query(`
          INSERT INTO public."Turno"(
              "idMedico", "idPaciente", "idArea", "idEstadoTurno", "Sintomas")
          VALUES ($1, $2, $3, $4, $5) 
          RETURNING *; 
      `, [idMedico, idPaciente, idArea, idEstadoTurno, Sintomas]);
      return res.rows;
  } catch (error) {
      console.error('Error al obtener la lista de espera:', error.message);
      throw error;
  }
};

module.exports = { insertTurno };
