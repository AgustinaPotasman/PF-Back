const TERepository = require('../repositories/tiempoEspera-repositories');

const obtenerTiempoDeEspera = async () => {
  try {
    return await TERepository.obtenerTodasLasAreas();
  } catch (error) {
    console.error('Error al obtener especialidades:', error);
    throw error;
  }
};

module.exports = { obtenerTiempoDeEspera };
