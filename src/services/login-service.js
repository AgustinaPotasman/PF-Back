
const authRepository = require('../repositories/login-repository');

const login = async (email, password) => {
  try {
    const user = await authRepository.getUserByEmail(email);
    if (!user) {
      return { error: 'Credenciales inválidas' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return { user };
    } else {
      return { error: 'Credenciales inválidas' };
    }
  } catch (error) {
    console.error('Error en el servicio de login:', error);
    throw error;
  }
};


module.exports = { login };
