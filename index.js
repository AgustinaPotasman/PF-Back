const express = require('express');
const bodyParser = require('body-parser');
const { crearTurno } = require('./src/services/turno-service');
const { especialidades } = require('./src/services/area-service');
const areaService = require('./src/services/area-service');
const TEService = require('./src/services/tiempoEspera-service')
const listaEsperaService = require('./src/services/listaEspera-service');
const ETService = require('./src/services/actualizarET-service')
const CPService = require('./src/services/cantPersonas-service')
const ITService = require('./src/services/insertarTurno-service')
const BTService = require('./src/services/borrarTurno-service')
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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

app.get('/api/tiempoEspera/:idArea', async (req, res) => {
  const { idArea } = req.params;
  try {
    const TE = await TEService.obtenerTiempoDeEspera(idArea);
    res.status(200).json(TE);
  } catch (error) {
    console.error('Error al obtener el tiempo de espera:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});


app.get('/api/cantidadPersonas/:idArea', async (req, res) => {
  try {
    const idArea = parseInt(req.params.idArea, 10);

    if (isNaN(idArea)) {
        return res.status(400).json({ error: 'idArea no es válido.' });
    }

    const cantidadPersonas = await CPService.contarPersonasEnArea(idArea);

    if (isNaN(cantidadPersonas) || cantidadPersonas < 1) {
        return res.status(400).json({ error: 'Cantidad de personas no es válida o es menor que 1.' });
    }

    res.json({ cantidadPersonas });
} catch (error) {
    console.error('Error en /api/cantidadPersonas:', error.message);
    res.status(500).json({ error: 'Error al obtener la cantidad de personas en el área.' });
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

app.put('/api/actualizarEstadoTurno/:idTurno', async (req, res) => {
  const { idTurno } = req.params; 
  const { nuevoEstadoId } = req.body; 

  try {
    const success = await ETService.actualizarEstadoTurno(idTurno, nuevoEstadoId);

    if (success) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'No se pudo actualizar el estado del turno' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado del turno', message: error.message });
  }
});

app.post('/api/insertarTurno', async (req, res) => {
  const { idMedico, idPaciente, idArea, idEstadoTurno, Sintomas } = req.body;
  try {
    const turnoNuevo = await ITService.insertTurno(idMedico, idPaciente, idArea, idEstadoTurno, Sintomas);
    res.json(turnoNuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un turno', message: error.message });
  }
});

app.delete('/api/borrarTurno/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await BTService.cancelarTurno(id);
    if (result.rowCount === 0) {
      // Si no se encontró el turno para eliminar
      res.status(404).json({ error: 'Turno no encontrado' });
    } else {
      res.status(200).json({ message: 'Turno cancelado exitosamente.' });
    }
  } catch (error) {
    console.error('Error al cancelar el turno:', error.message); // Log para depuración
    res.status(500).json({ error: 'Error al cancelar el turno', message: error.message });
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



