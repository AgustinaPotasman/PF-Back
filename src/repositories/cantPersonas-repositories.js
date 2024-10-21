const pool = require('../configs/db-configs');

const contarPersonasEnArea = async (idArea, Id) => {
    try {
        const res = await pool.query(
            `SELECT COUNT(*) AS cantidadpersonas 
             FROM public."Turno" T 
             WHERE T."FechaHora" < (SELECT t."FechaHora" FROM public."Turno" t WHERE t."Id" = $2)  AND t."idEstadoTurno" != 3
             AND T."idArea" = $1`,
            [idArea, Id]
        );

        if (res.rows.length >= 0) {
            let cantidadPersonas = parseInt(res.rows[0].cantidadpersonas, 10);
            return cantidadPersonas;
        } else {
            return 0; 
        }
    } catch (error) {
        console.error('Error al contar personas en el área:', error.message);
        throw error;
    }
};

module.exports = { contarPersonasEnArea };
