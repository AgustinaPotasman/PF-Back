const LERepository = require('../repositories/listaEspera-repositories');

const obtenerListaEspera = async (idArea) => {
  try {
    return await LERepository.obtenerListaEsperaPorArea(idArea);
  } catch (error) {
    console.error('Error en el servicio al obtener la lista de espera:', error.message);
    throw error;
  }
};

module.exports = { obtenerListaEspera };

