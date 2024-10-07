import { Router } from "express";
import direccionService from "../service/iniciarsesion-service.js";

const router = Router();
const svc = new direccionService();

router.get('/:username/:password', async (req, res) => {
    const { username, password } = req.params; 
    const result = await svc.getByUserNameAndPasswordAsync(username, password);
    
    if (result.status === 'USER_NOT_FOUND') {
        res.status(404).send('No hay ningún usuario registrado con ese nombre.');
    } else if (result.status === 'INCORRECT_PASSWORD') {
        res.status(401).send('La contraseña no coincide.');
    } else if (result.status === 'SUCCESS') {
        res.status(200).json(result.user);
    } else {
        res.status(500).send('Error Interno');
    }
});

export default router;