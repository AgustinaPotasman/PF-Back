const areaRepository = require('../repositories/area-repositories');

const obtenerEspecialidades = async () => {
  try {
    return await areaRepository.obtenerTodasLasAreas();
  } catch (error) {
    console.error('Error al obtener especialidades:', error);
    throw error;
  }
};

module.exports = { obtenerEspecialidades };
