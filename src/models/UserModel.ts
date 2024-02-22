class UserModel {
    puntuacion:number;
    nombre:string;
    bio:string;
    facebook:string;
    twitter:string;
    movil:number;
    instagram:string;
    

    constructor (puntuacion:number, nombre:string, bio:string, facebook:string, twitter:string, movil:number, instagram:string) {
        this.nombre=nombre;
        this.puntuacion=puntuacion;
        this.bio=bio;
        this.facebook=facebook;
        this.twitter=twitter;
        this.movil=movil;
        this.instagram=instagram;
    }

}

export default UserModel;