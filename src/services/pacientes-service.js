const pool = require('../configs/db-configs');
const PatientRepository = require('../repositories/paciente-repositories'); 

class PatientsService {
    constructor() {
        this.repos = new PatientRepository();
    }

    login = async (DNI, contrasena) => {
        return this.repos.login(DNI, contrasena); 
    }

    crearPaciente = async ({ nombre, apellido, DNI, gmail, obra_social, contrasena, telefono }) => {
        return this.repos.crearPaciente(nombre, apellido, DNI, gmail, obra_social, contrasena, telefono);
    }
}


module.exports = PatientsService;
