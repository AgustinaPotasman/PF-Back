const areaRepository = require('../repositories/area-repositories');

async function especialidades(area) {
    return await areaRepository.todasLasTareas(area);
  }
  
  module.exports = { especialidades };