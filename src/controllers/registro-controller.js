import {Router} from "express"
import registroService from '../service/registro-service.js'

const router = Router();
const svc = new registroService();

router.post('/', async (req, res) => {
    try {
        const result = await svc.registrarAsync(req.body);
        if (result.error) {
            res.status(400).json({ mensaje: result.error });
        } else {
            res.status(200).json({ mensaje: 'Usuario registrado con éxito' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Interno');
    }
});

export default router;