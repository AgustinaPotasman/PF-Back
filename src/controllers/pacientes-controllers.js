const express = require('express');
const { Router } = express;
const PatientsService = require('../services/pacientes-service'); 
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middlewares/auth-middleware');
const pool = require('../configs/db-configs');
const UserRouter = Router();
const svc = new PatientsService();
const JWT_SECRET = 'your_jwt_secret';

UserRouter.post('/register', async (req, res) => {
    const { nombre, apellido, DNI, gmail, obra_social, contrasena, telefono } = req.body;

    if (!nombre || !apellido || !DNI || !gmail || !contrasena || !telefono) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    if (contrasena.length < 3) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 3 caracteres.' });
    }

    try {
        const newPatient = await svc.crearPaciente(nombre, apellido, DNI, gmail, obra_social, contrasena, telefono);
        if (!newPatient) {
            return res.status(400).json({ message: 'Error al registrar el paciente. Verifique si el DNI o el email ya están en uso.' });
        }

        const token = jwt.sign({ DNI }, JWT_SECRET, { expiresIn: '365d' });
        res.status(201).json({ message: 'Paciente registrado exitosamente', token });
    } catch (error) {
        console.error('Error durante el registro:', error);
        res.status(500).json({ message: 'Error en el registro. Inténtalo nuevamente.', details: error.message });
    }
});

UserRouter.post('/login', async (req, res) => {
    const { DNI, contrasena } = req.body;

    try {
        const patient = await svc.login(DNI);
        if (!patient) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: patient.id }, JWT_SECRET, { expiresIn: '365d' });
        res.status(200).json({ patient, token });
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        res.status(500).json({ message: error.message });
    }
});

// Nuevas rutas protegidas
UserRouter.get('/all', authenticateToken, async (req, res) => {
    try {
        const patients = await svc.getAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        console.error('Error al obtener pacientes:', error);
        res.status(500).json({ message: error.message });
    }
});

UserRouter.get('/:DNI', authenticateToken, async (req, res) => {
    try {
        const patient = await svc.getPatientByDNI(req.params.DNI);
        if (!patient) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error('Error al obtener paciente:', error);
        res.status(500).json({ message: error.message });
    }
});

UserRouter.put('/:DNI', authenticateToken, async (req, res) => {
    const { nombre, apellido, gmail, obra_social, telefono } = req.body;
    try {
        const updatedPatient = await svc.updatePatient(req.params.DNI, { nombre, apellido, gmail, obra_social, telefono });
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Paciente no encontrado o no se pudo actualizar' });
        }
        res.status(200).json({ message: 'Paciente actualizado exitosamente', patient: updatedPatient });
    } catch (error) {
        console.error('Error al actualizar paciente:', error);
        res.status(500).json({ message: error.message });
    }
});

UserRouter.delete('/:DNI', authenticateToken, async (req, res) => {
    try {
        const deleted = await svc.deletePatient(req.params.DNI);
        if (!deleted) {
            return res.status(404).json({ message: 'Paciente no encontrado o no se pudo eliminar' });
        }
        res.status(200).json({ message: 'Paciente eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar paciente:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = UserRouter;
