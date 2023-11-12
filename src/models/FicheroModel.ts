class FicheroModel {
    id:number;
    ruta:string;
    descripcion:string;

    constructor (id:number,  descripcion:string, ruta:string) {
        this.id=id;
        this.ruta=ruta;
        this.descripcion=descripcion;
    }
}

export default FicheroModel;