const express = require('express');
const bodyParser = require('body-parser');
const { crearTurno } = require('./src/services/turno-service');
const { especialidades } = require('./src/services/area-service');
const areaService = require('./src/services/area-service');
const TEService = require('./src/services/tiempoEspera-service')
const listaEsperaService = require('./src/services/listaEspera-service');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/turnos', async (req, res) => {
  try {
    const nuevoTurno = req.body;
    console.log(nuevoTurno);
    const resultado = await crearTurno(nuevoTurno);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error al crear el turno:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/areas', async (req, res) => {
  try {
    const areas = await areaService.obtenerEspecialidades();
    res.status(200).json(areas);
  } catch (error) {
    console.error('Error al obtener las áreas:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.get('/api/tiempoEspera', async (req, res) => {
  try {
    const TE = await TEService.obtenerTiempoDeEspera();
    res.status(200).json(TE);
  } catch (error) {
    console.error('Error al obtener el tiempo de espera:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.get('/api/listaEspera/:idArea', async (req, res) => {
  const { idArea } = req.params;
  try {
    const listaEspera = await listaEsperaService.obtenerListaEspera(idArea);
    res.json(listaEspera);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de espera', message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



