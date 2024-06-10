const express = require('express');
const bodyParser = require('body-parser');
const { crearTurno } = require('./src/services/turno-service');
const app = express();

app.use(bodyParser.json());

app.post('/turnos', async (req, res) => {
  try {
    const nuevoTurno = req.body;
    const resultado = await crearTurno(nuevoTurno);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error al crear el turno:', error);
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
