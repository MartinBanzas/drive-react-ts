class FicheroModel {
    id:number;
    ruta:string;
    descripcion:string;
    tipo:string;
    size:number;

    constructor (id:number,  descripcion:string, ruta:string, tipo:string, size:number) {
        this.id=id;
        this.ruta=ruta;
        this.descripcion=descripcion;
        this.tipo=tipo;
        this.size=size;
    }
}

export default FicheroModel;