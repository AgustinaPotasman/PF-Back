const pool = require('../configs/db-configs');
const bcrypt = require('bcryptjs');

class PatientRepository {
    crearPaciente = async (nombre, apellido, dni, gmail, obra_social, contrasena, telefono, foto) => {
        const client = await pool.connect();
        try {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const query = `
                INSERT INTO public."Paciente" 
                ("nombre", "apellido", "DNI", "gmail", "obra_social", "contraseña", "telefono", "foto") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `;
    
            await client.query(query, [nombre, apellido, dni, gmail, obra_social, hashedPassword, telefono, foto]);
            return true; 
        } catch (error) {
            console.error('Error al crear usuario:', error.message); 
            return error.message; 
        } finally {
            client.release();
        }
    }

    async login(DNI, contrasena) {
        const client = await pool.connect();
        try {
            console.log('Datos recibidos:', { DNI, contrasena }); 
            console.log(`Buscando paciente con DNI: ${DNI}`);
            const query = `SELECT * FROM public."Paciente" WHERE "DNI" = $1`;
            const result = await client.query(query, [DNI]);
            const patient = result.rows[0];
            console.log('Resultado de la consulta:', patient);
            
            if (patient && patient['Contraseña'] === contrasena) {
                return patient; 
            }
    
            if (patient && await bcrypt.compare(contrasena, patient['Contraseña'])) {
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