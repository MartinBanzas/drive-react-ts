class UserModel {
    puntuacion:number;
    nombre:string;

    constructor (puntuacion:number, nombre:string) {
        this.nombre=nombre;
        this.puntuacion=puntuacion;
    }

}

export default UserModel;