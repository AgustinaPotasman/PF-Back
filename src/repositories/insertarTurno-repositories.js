const pool = require('../configs/db-configs');

const insertTurno = async (idMedico, idPaciente, idArea, idEstadoTurno, FechaHora, Sintomas) => {
    try {
      const res = await pool.query(`
      INSERT INTO public."Turno"(
        "idMedico", "idPaciente", "idArea", "TurnosPrevios", "idEstadoTurno", "FechaHora", "Sintomas")
        VALUES idMedico = $1, idPaciente = $2, idArea = $3, idEstadoTurno = $4, FechaHora = $5, Sintomas = $6;
      `, [idMedico, idPaciente, idArea, idEstadoTurno, FechaHora, Sintomas]);
      return res.rows;
    } catch (error) {
      console.error('Error al obtener la lista de espera:', error.message);
      throw error;
    }
  };
  
  module.exports = { insertTurno };