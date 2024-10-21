export default class Usuario {
    constructor(id,nombre,apellido,telefono,mail,contraseña,vendedor){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.mail = mail;
        this.contraseña = contraseña;
        this.vendedor = vendedor;

    }
    toString() {
        return `Nombre: ${this.nombre}, Id: ${this.id}, Apellido: ${this.apellido}, Telefono: ${this.telefono}, Mail: ${this.mail},Contraseña ${this.contraseña},Vendedor ${this.vendedor}`
    }
}