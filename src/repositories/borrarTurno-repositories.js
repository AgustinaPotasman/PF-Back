const pool = require('../configs/db-configs');

const cancelarTurno = async (id) => {
  try {
    const result = await pool.query(`DELETE FROM public."Turno" WHERE "Id" = $1 RETURNING *`, [id]);
    return result;
  } catch (error) {
    console.error('Error al eliminar el turno:', error.message);
    throw error;
  }
};

module.exports = { cancelarTurno };

