class FicheroModel {
    id:number;
    ruta:string;
    descripcion:string;
    tipo:string;
    size:string;
    fCreacion:string;

    constructor (id:number,  descripcion:string, ruta:string, tipo:string, size:string, fCreacion:string) {
        this.id=id;
        this.ruta=ruta;
        this.descripcion=descripcion;
        this.tipo=tipo;
        this.size=size;
        this.fCreacion=fCreacion;
    }
}

export default FicheroModel;