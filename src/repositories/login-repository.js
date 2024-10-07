const db = require('../db'); // Asegúrate de que esto apunte correctamente a tu conexión

const register = async (Paciente) => {
    const { nombre, apellido, dni, gmail, obraSocial, contraseña, telefono, foto } = user;

    try {
        const result = await db.query(
            'INSERT INTO pacientes (nombre, apellido, dni, gmail, obraSocial, contraseña, telefono, foto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nombre, apellido, dni, gmail, obraSocial, contraseña, telefono, foto]
        );

        console.log('Resultado del registro en la base de datos:', result); // Mensaje de depuración
        return result.rows[0]; // Retorna el nuevo paciente
    } catch (error) {
        console.error('Error al registrar en la base de datos:', error.message); // Log para depuración
        throw new Error('Error al registrar en la base de datos.'); // Mensaje de error genérico
    }
};

module.exports = { register };
