const TERepository = require('../repositories/tiempoEspera-repositories');
const pool = require('../configs/db-configs');

 
  const obtenerTiempoDeEspera = async (idArea) => {
    try {
      return await TERepository.obtenerTE(idArea);
    } catch (error) {
      console.error('Error al obtener tiempo espera:', error);
      throw error;
    }
  };
 

 

module.exports = { obtenerTiempoDeEspera };
