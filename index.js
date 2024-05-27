const express = require('express');
const bodyParser = require('body-parser');
const turnoService = require('./services/turno-service.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/guardar-turno', async (req, res) => {
  try {
    const turnoGuardado = await turnoService.guardarTurno(req.body);
    res.json({ success: true, message: 'Turno guardado correctamente', turno: turnoGuardado });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
