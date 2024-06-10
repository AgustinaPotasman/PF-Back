class Turno {
    constructor(IdMedico, IdPaciente, TiempoDeEspera, IdArea, TurnosPrevios, IdEstadoTurno, FechaHora, Sintomas) {
      this.IdMedico = IdMedico;
      this.IdPaciente = IdPaciente;
      this.TiempoDeEspera = TiempoDeEspera;
      this.IdArea = IdArea;
      this.TurnosPrevios = TurnosPrevios;
      this.IdEstadoTurno = IdEstadoTurno;
      this.FechaHora = FechaHora;
      this.Sintomas = Sintomas;
    }
  
    static values(turno) {
      return [
        turno.IdMedico,
        turno.IdPaciente,
        turno.TiempoDeEspera,
        turno.IdArea,
        turno.TurnosPrevios,
        turno.IdEstadoTurno,
        turno.FechaHora,
        turno.Sintomas
      ];
    }
  }
  
  module.exports = Turno;
  