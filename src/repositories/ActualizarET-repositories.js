const pool = require('../configs/db-configs');

const actualizarEstadoTurno = async (idturno, nuevoEstadoId) => {
  try {
      const res = await pool.query(`
          UPDATE public."Turno"
          SET "idEstadoTurno" = $1
          WHERE "Id" = $2
      `, [nuevoEstadoId, idturno]);
      
      console.log(`Filas afectadas: ${res.rowCount}`);
      return res.rowCount > 0; 
  } catch (error) {
      console.error('Error al actualizar el estado del turno:', error.message);
      throw error; 
  }
};

module.exports = { actualizarEstadoTurno };
