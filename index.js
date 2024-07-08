const express = require('express');
const bodyParser = require('body-parser');
const { crearTurno } = require('./src/services/turno-service');
const { especialidades } = require('./src/services/area-service');
const app = express();
const areaService = require('./src/services/area-service');

app.use(bodyParser.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



