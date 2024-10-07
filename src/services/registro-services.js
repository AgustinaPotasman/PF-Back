import registroRepository from '../repository/registro-Repository.js';

export default class registroService {
    registrarAsync = async (registroInfo) => {
        const repo = new registroRepository();

        // Verificar si el email ya está registrado
        const emailExistente = await repo.verificarEmailAsync(registroInfo.mail);
        if (emailExistente) {
            return { error: 'El email ya está registrado' };
        }

        // Verificar si el username ya está registrado
        const usernameExistente = await repo.verificarUsernameAsync(registroInfo.username);
        if (usernameExistente) {
            return { error: 'El nombre de usuario ya está registrado' };
        }

        // Registrar el nuevo usuario
        const result = await repo.registrarseAsync(registroInfo);
        return result;
    };


}