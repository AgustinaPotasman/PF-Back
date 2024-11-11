const pool = require('../configs/db-configs');
const bcrypt = require('bcryptjs');
class PatientRepository {
    crearPaciente = async (nombre, apellido, dni, gmail, obra_social, contrasena, telefono, foto) => {
        const client = await pool.connect();
        try {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const query = `
            insert into public. "Paciente" ("Nombre", "Apellido", "DNI", "Gmail", "ObraSocial", "Contraseña", "Telefono", "Foto") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                        
            `;

            console.log(nombre, apellido, dni, gmail, obra_social, contrasena, telefono, foto); // Verifica que 'dni' no sea undefined
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
            const pacienteQuery = `SELECT * FROM public."Paciente" WHERE "DNI" = $1`;
            const pacienteResult = await client.query(pacienteQuery, [DNI]);
            const paciente = pacienteResult.rows[0];
            
            if (paciente) {
                console.log('Resultado de la consulta a Paciente:', paciente);
    
                if (paciente['Contraseña'] === contrasena) {
                    return paciente; 
                }
                
                if (await bcrypt.compare(contrasena, paciente['Contraseña'])) {
                    return paciente; 
                }
            }
            

            console.log(`Buscando medico con DNI: ${DNI}`);
            const medicoQuery = `SELECT * FROM public."Medico" WHERE "DNI" = $1`;
            const medicoResult = await client.query(medicoQuery, [DNI]);
            const medico = medicoResult.rows[0];
    
            if (medico) {
                console.log('Resultado de la consulta a Medico:', medico);
    
                if (medico['Contraseña'] === contrasena) {
                    return medico; 
                }
                
                if (await bcrypt.compare(contrasena, medico['Contraseña'])) {
                    return medico; 
                }
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