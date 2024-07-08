const pool = require('../configs/db-configs');
const Area = require('../entities/area');

async function todasLasAreas (area){
    const {Especialidad} = area;
    const query = `SELECT * FROM Area`
    try {
        const res = await pool.query(query);
        return res.rows[0];
      } catch (error) {
        console.error(error);
        throw error;
      }
    
}

module.exports = { todasLasAreas };