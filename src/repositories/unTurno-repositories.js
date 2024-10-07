const pool = require('../configs/db-configs');

const getUnTurno = async (id) => {
    try {
      const res = await pool.query(`
        SELECT "Id", "idEstadoTurno"
        FROM public."Turno" t
        WHERE t."Id" = $1
      `, [id]);
      return res.rows[0]; 
    } catch (error) {
      console.error('Error al obtener el turno:', error.message);
      throw error;
    }
  };
  

module.exports = { getUnTurno };