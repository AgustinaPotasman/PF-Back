const pool = require('../configs/db-configs');
const PatientRepository = require('../repositories/pacientes-repositories'); 

class PatientsService {
    constructor() {
        this.repos = new PatientRepository();
    }

    login = async (DNI, contrasena) => {
        console.log("estoy en el service", DNI, contrasena)
        return this.repos.login(DNI, contrasena); 
    }

    crearPaciente = async ({ nombre, apellido, DNI, gmail, obra_social, contrasena, telefono, foto }) => {
        return this.repos.crearPaciente(nombre, apellido, DNI, gmail, obra_social, contrasena, telefono, foto);
      };
      
      crearMedico = async ({ nombre, apellido, DNI, gmail, contrasena, telefono, foto, idArea }) => {
        return this.repos.crearMedico(nombre, apellido, DNI, gmail, contrasena, telefono, foto, idArea);
      };
    
}


module.exports = PatientsService;
