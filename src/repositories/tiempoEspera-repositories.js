const pool = require('../configs/db-configs');

  const  obtenerTE = async (idArea) => {
    try {
      const res = await pool.query('SELECT "Id", "TiempoEspera" FROM public."Area" WHERE "Id" = $1', [idArea]);
      return res.rows;
    } catch (error) {
      console.error('Error al obtener todas las áreas:', error);
      throw error;
    }
  };
  
  


module.exports = { obtenerTE };