import { getTurnosPrevios } from '../services/turnosService';

export const handleGetTurnosPrevios = async (req, res) => {
  const { especialidad } = req.query;

  try {
    const turnosPrevios = await getTurnosPrevios(especialidad);
    res.status(200).json({ turnosPrevios });
  } catch (error) {
    console.error('Error fetching turnos previos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
