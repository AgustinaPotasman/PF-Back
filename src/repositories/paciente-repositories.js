const pool = require('../configs/db-configs');

class PatientRepository {
    async crearPaciente(nombre, apellido, DNI, gmail, obra_social, contrasena, telefono) {
        const client = await pool.connect();
        try {
            if (!nombre || !apellido || !DNI || !gmail || !contrasena) {
                console.error('Faltan campos obligatorios para registrar al paciente.');
                return false;
            }

            const existingPatient = await client.query(
                `SELECT * FROM paciente WHERE DNI = $1 OR gmail = $2`,
                [DNI, gmail]
            );

            if (existingPatient.rows.length > 0) {
                console.error('DNI o email ya están en uso.');
                return false; // Retorna false si ya existe
            }

            // Puedes guardar la contraseña sin encriptar (aunque no es recomendable)
            await client.query(
                `INSERT INTO paciente (nombre, apellido, DNI, gmail, obra_social, contrasena, telefono) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [nombre, apellido, DNI, gmail, obra_social, contrasena, telefono]
            );
            return true;
        } catch (error) {
            console.error('Error durante la creación del paciente:', error);
            return false;
        } finally {
            client.release();
        }
    }
}


module.exports = PatientRepository;
