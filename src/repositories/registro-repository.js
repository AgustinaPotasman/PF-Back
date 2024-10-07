import DBConfig from '../configs/db-configs.js';
import pkg from 'pg';

const { Paciente } = pkg; // Cambiar Client a Paciente

export default class registroRepository {
    // Método para verificar si un email ya está registrado
    verificarEmailAsync = async (email) => {
        const paciente = new Paciente(DBConfig); // Cambiar de Client a Paciente
        let existe = false;
        try {
            await paciente.connect();
            const sql = `SELECT COUNT(*) FROM public."usuario" WHERE "mail" = $1`;
            const result = await paciente.query(sql, [email]);
            existe = result.rows[0].count > 0;
        } catch (error) {
            console.error(error);
        } finally {
            await paciente.end();
        }
        return existe;
    };

    // Método para verificar si un username ya está registrado
    verificarUsernameAsync = async (username) => {
        const paciente = new Paciente(DBConfig); // Cambiar de Client a Paciente
        let existe = false;
        try {
            await paciente.connect();
            const sql = `SELECT COUNT(*) FROM public."usuario" WHERE "username" = $1`;
            const result = await paciente.query(sql, [username]);
            existe = result.rows[0].count > 0;
        } catch (error) {
            console.error(error);
        } finally {
            await paciente.end();
        }
        return existe;
    };

    // Método para registrar un usuario
    registrarseAsync = async (registroInfo) => {
        const paciente = new Paciente(DBConfig); // Cambiar de Client a Paciente
        let returnArray = null;
        try {
            await paciente.connect();
            const sql = `INSERT INTO public."usuario"(
                "nombre", "apellido", "telefono", "mail", "password", "username", "vendedor", "fechaNac") 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
            const result = await paciente.query(sql, [
                registroInfo.nombre,
                registroInfo.apellido,
                registroInfo.telefono,
                registroInfo.mail,
                registroInfo.password,
                registroInfo.username,
                registroInfo.vendedor,
                registroInfo.fechaNac
            ]);
            returnArray = result.rows;
        } catch (error) {
            console.error(error);
        } finally {
            await paciente.end();
        }
        return returnArray;
    };
}
