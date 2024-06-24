function validarTurno(turno) {
    function esEntero(valor) {
      return Number.isInteger(valor);
    }
    
    function esHora(valor) {
      const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
      return regex.test(valor);
    }
    
    function esFecha(valor) {
      return !isNaN(Date.parse(valor));
    }
    
    function esTexto(valor) {
      return typeof valor === 'string';
    }
    
    function validarTurno(turno) {
      const { idMedico, idPaciente, TiempoDeEspera, idArea, TurnosPrevios, idEstadoTurno, FechaHora, Sintomas } = turno;
    
      if (!esEntero(idMedico)) {
        throw new Error('IdMedico debe ser un número entero.');
      }
    
      if (!esEntero(idPaciente)) {
        throw new Error('IdPaciente debe ser un número entero.');
      }
    
      if (!esHora(TiempoDeEspera)) {
        throw new Error('TiempoDeEspera debe ser una hora válida en formato HH:MM:SS.');
      }
    
      if (!esEntero(idArea)) {
        throw new Error('IdArea debe ser un número entero.');
      }
    
      if (!esEntero(TurnosPrevios)) {
        throw new Error('TurnosPrevios debe ser un número entero.');
      }
    
      if (!esEntero(idEstadoTurno)) {
        throw new Error('IdEstadoTurno debe ser un número entero.');
      }
    
      if (!esFecha(FechaHora)) {
        throw new Error('FechaHora debe ser una fecha válida.');
      }
    
      if (!esTexto(Sintomas)) {
        throw new Error('Sintomas debe ser un texto.');
      }
    }
  }
  module.exports = { validarTurno };

  