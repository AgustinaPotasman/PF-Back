const pool = require('../configs/db-configs');
const PatientRepository = require('../repositories/paciente-repositories'); // Asegúrate de que la ruta sea correcta

class PatientsService {
    constructor() {
        this.repos = new PatientRepository();
    }

    login = async (DNI) => {
        return this.repos.login(DNI);
    }

    crearPaciente = async ({ nombre, apellido, DNI, gmail, obra_social, contrasena, telefono }) => {
        return this.repos.crearPaciente(nombre, apellido, DNI, gmail, obra_social, contrasena, telefono);
    }
}

module.exports = PatientsService;
