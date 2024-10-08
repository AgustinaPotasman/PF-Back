const pool = require('../configs/db-configs');

const contarPersonasEnArea = async (idArea) => {
    try {
        const res = await pool.query(
            `SELECT COUNT(*) AS cantidadPersonas
            FROM public."Turno"
            WHERE "idArea" = $1 AND "idEstadoTurno" IN (1, 2)`, [idArea]);

        if (res.rows.length > 0) {
            let cantidadPersonas = parseInt(res.rows[0].cantidadpersonas, 10);
            return cantidadPersonas;
        } else {
            return 0; // Si no hay resultados
        }
    } catch (error) {
        console.error('Error al contar personas en el área:', error.message);
        throw error;
    }
};

module.exports = { contarPersonasEnArea };
