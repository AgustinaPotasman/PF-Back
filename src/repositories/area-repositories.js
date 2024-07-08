const pool = require('../configs/db-configs');

const obtenerTodasLasAreas = async () => {
  try {
    const res = await pool.query('SELECT "Id", "Especialidad" FROM public."Area"');
    return res.rows;
  } catch (error) {
    console.error('Error al obtener todas las áreas:', error);
    throw error;
  }
};

module.exports = { obtenerTodasLasAreas };
