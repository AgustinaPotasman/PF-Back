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

            console.log(nombre, apellido, dni, gmail, obra_social, contrasena, telefono, foto); 
            await client.query(query, [nombre, apellido, dni, gmail, obra_social, hashedPassword, telefono, foto]);
            return true; 
        } catch (error) {
            console.error('Error al crear usuario:', error.message); 
            return error.message; 
        } finally {
            client.release();
        }
    }

    crearMedico = async (nombre, apellido, DNI, gmail, contrasena, telefono, foto, area) => {
        const client = await pool.connect();
        try {
          const hashedPassword = await bcrypt.hash(contrasena, 10);
    
          const areaQuery = `SELECT "Id" FROM public."Area" WHERE "Especialidad" = $1 ;`;
          const areaResult = await client.query(areaQuery, [area]);
      
          if (areaResult.rows.length === 0) {
            throw new Error('Área no encontrada.');
          }
      
          const idArea = areaResult.rows[0].Id;
      
          const medicoQuery = `
            INSERT INTO public."Medico" 
            ("Nombre", "Apellido", "DNI", "Gmail", "Telefono", "Foto", "contraseña", "idArea") 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
          `;
      
          await client.query(medicoQuery, [nombre, apellido, DNI, gmail, telefono, foto, hashedPassword, idArea]);
          return true;
        } catch (error) {
          console.error('Error al crear médico:', error.message);
          return error.message;
        } finally {
          client.release();
        }
      };

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
    
                if (await bcrypt.compare(contrasena.trim(), paciente['Contraseña'])) {
                    return paciente; 
                }
            }
    
            console.log(`Buscando medico con DNI: ${DNI}`);
            const medicoQuery = `SELECT * FROM public."Medico" WHERE "DNI" = $1`;
            const medicoResult = await client.query(medicoQuery, [DNI]);
            const medico = medicoResult.rows[0];
    
            if (medico) {
                console.log('Resultado de la consulta a Medico:', medico);
                const storedPassword = medico['contraseña']; 
                if (medico && medico['contraseña']) {
                    console.log('Contraseña almacenada:', medico['contraseña']);
                    console.log('Contraseña ingresada:', contrasena.trim());
                    if (storedPassword) {
                        console.log('Contraseña almacenada:', storedPassword);
                        console.log('Contraseña ingresada:', contrasena.trim());
                    }

                console.log("Holaa", contrasena.trim())
                console.log("chauu", medico['contraseña'])
                    if ( bcrypt.compare(contrasena.trim(), medico['contraseña'])) {
                        return medico;
                    } else {
                        console.log('Contraseña incorrecta');
                    }
                } else {
                    console.log('Contraseña no encontrada para el médico');
                }

                console.log('Resultado de la consulta a Medico:', medico);
console.log('Contraseña del médico:', medico ? medico['contraseña'] : 'No existe contraseña');

    
                if (await bcrypt.compare(contrasena.trim(), medico['contraseña'])) {
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