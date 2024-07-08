class Area {
    constructor(Especialidad) {
      this.Especialidad = Especialidad
    }
  
    static values(area) {
      return [
        area.Especialidad
      ];
    }
    
  }
  
  module.exports = Area;