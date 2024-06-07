const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/turnos', async (req, res) => {
  try {
    const nuevoTurno = await guardarNuevoTurno(req.body);
    res.status(201).json(nuevoTurno);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el turno' });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

