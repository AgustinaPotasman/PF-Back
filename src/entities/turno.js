class Turno {
    constructor(idMedico, idPaciente, TiempoDeEspera, idArea, TurnosPrevios, idEstadoTurno, FechaHora, Sintomas) {
      this.idMedico = idMedico;
      this.idPaciente = idPaciente;
      this.TiempoDeEspera = TiempoDeEspera;
      this.idArea = idArea;
      this.TurnosPrevios = TurnosPrevios;
      this.idEstadoTurno = idEstadoTurno;
      this.FechaHora = FechaHora;
      this.Sintomas = Sintomas;
    }
  
    static values(turno) {
      return [
        turno.idMedico,
        turno.idPaciente,
        turno.TiempoDeEspera,
        turno.idArea,
        turno.TurnosPrevios,
        turno.idEstadoTurno,
        turno.FechaHora,
        turno.Sintomas
      ];
    }
    
  }
  
  module.exports = Turno;
  