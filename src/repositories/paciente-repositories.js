const pool = require('../configs/db-configs');

const obtenerPaciente = async (idTurno) => {
  try {
    const res = await pool.query(`
      SELECT * FROM public."Turno" 
      WHERE "Id" = $1
    `, [idTurno]);
    
    return res.rows[0]; // Devuelve el primer registro encontrado
  } catch (error) {
    console.error('Error al obtener el paciente:', error.message);
    throw error; // Lanza el error para manejarlo en el controlador
  }
};

module.exports = { obtenerPaciente };
