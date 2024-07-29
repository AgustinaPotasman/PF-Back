import pool from '../configs/db';

export const getTurnosPrevios = async (especialidad) => {
  try {
    const result = await pool.query(`
      SELECT COUNT(*) AS turnosPrevios
      FROM public."Turno" t
      JOIN public."Area" a ON t."idArea" = a."Id"
      WHERE a."Especialidad" = $1 AND t."idEstadoTurno" = 1
    `, [especialidad]);
    return result.rows[0].turnosprevios;
  } catch (error) {
    console.error('Error fetching turnos previos:', error);
    throw new Error('Error fetching turnos previos');
  }
};
