class Turno {
    constructor(Id, idMedico, idPaciente, TiempoDeEspera, idArea, TurnosPrevios, idEstadoTurno, FechaHora, Sintomas) {
      this.Id = Id;
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
        turno.idTurno,
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
  