const pool = require('../configs/db-configs');

class PatientRepository {
    async crearPaciente(nombre, apellido, DNI, gmail, obra_social, contrasena, telefono) {
        const client = await pool.connect();
        try {
            if (!nombre || !apellido || !DNI || !gmail || !contrasena || !telefono) {
                throw new Error('Faltan campos obligatorios para registrar al paciente.');
            }

            const existingPatient = await client.query(
                'SELECT * FROM paciente WHERE DNI = $1 OR gmail = $2', // Asegúrate de que la consulta esté entre comillas
                [DNI, gmail]
            );

            if (existingPatient.rows.length > 0) {
                throw new Error('DNI o email ya están en uso.'); 
            }

            await client.query(
                'INSERT INTO paciente (nombre, apellido, DNI, gmail, obra_social, contrasena, telefono) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [nombre, apellido, DNI, gmail, obra_social, contrasena, telefono]
            );
            return true; // Retorna true si todo salió bien
        } catch (error) {
            console.error('Error durante la creación del paciente:', error);
            throw error;
        } finally {
            client.release();
        }
    
    }
}


module.exports = PatientRepository;
