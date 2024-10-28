const pool = require('../configs/db-configs');

class PatientRepository {
    async crearPaciente(nombre, apellido, DNI, gmail, obra_social, contrasena, telefono) {
        const client = await pool.connect();
        try {
            if (!nombre || !apellido || !DNI || !gmail || !contrasena || !telefono) {
                throw new Error('Faltan campos obligatorios para registrar al paciente.');
            }

            const existingPatient = await client.query(
                'SELECT * FROM public."Paciente" WHERE "DNI" = $1 OR "gmail" = $2', 
                [DNI, gmail]
            );

            if (existingPatient.rows.length > 0) {
                throw new Error('DNI o email ya están en uso.'); 
            }

            await client.query(
                'INSERT INTO public."Paciente" ("nombre", "apellido", "DNI", "gmail", "obrasocial", "contrasena", "telefono") VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [nombre, apellido, DNI, gmail, obra_social, contrasena, telefono]
            );
            return true; 
        } catch (error) {
            console.error('Error durante la creación del paciente:', error);
            throw error;
        } finally {
            client.release();
        }
    
    }
    async login(DNI, contrasena) {
        const client = await pool.connect();
        try {
            console.log(`SELECT * FROM public."Paciente" WHERE "DNI" = ${new String(DNI)}`)
            const result = await client.query(`SELECT * FROM public."Paciente" WHERE "DNI" = '${DNI}'`);
            const patient = result.rows[0];
            console.log('Resultado de la consulta:', result.rows);
            if (patient && result.rows[0]['Contraseña'] === contrasena) {
                return patient; 
            }
            return null;
            
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            throw error;
        } finally {
            client.release();
        }
    }
}


module.exports = PatientRepository;




  