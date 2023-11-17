import React, { useEffect, useState } from "react";
import FicheroModel from "../../models/FicheroModel";
import { Download } from "../utils/Download";
import { formatFecha, formatSize, getImg } from "../utils/Utils";


export const FilesTable = () => {
  const [ficheros, setFicheros] = useState<FicheroModel[]>([]);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchFicheros = async () => {
      const baseUrl: string = "http://localhost:8082/api/ficheroes";
      const url: string = `${baseUrl}?page=0&size=9`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Algo ha ido mal');
      }
      const responseJson = await response.json();

      console.log(responseJson);
      const responseData = responseJson._embedded.ficheroes;

      const loadedFiles: FicheroModel[] = [];

      for (const key in responseData) {
        loadedFiles.push({
          id: responseData[key].id,
          descripcion: responseData[key].descripcion,
          ruta: responseData[key].ruta,
          tipo: getImg(responseData[key].tipo),
          size: formatSize(responseData[key].size),
          fCreacion: formatFecha(responseData[key].fcreacion), //lower case, always use lower case...
        })


      }
      setFicheros(loadedFiles);
    };

    fetchFicheros().catch((error: any) => {
      setHttpError(error.message);
    });
  }, []);



  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const ultimosFicheros = ficheros.slice(-3);




  return (
    <div className="container-md text-center mt-4 bg-white rounded">
    <div className="container-sm">
      <div className="row"  >
        {ultimosFicheros.map((file, index) => (
          <div key={index} className="col-md-4 mb-4" >
           
            <div className="card mw-20 mt-3 h-100 overflow-hidden">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={file.tipo} height={96} width={96} className=" img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title ">{file.ruta}</h5>
                    <p className="card-text">{file.fCreacion}</p>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
      <div>
        <table className="table table-striped rounded align-items-center">
          <thead>
            <tr>
              <th scope="col" className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nombre</th>
              <th scope="col" className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Descripción</th>
              <th scope="col" className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tipo</th>
              <th scope="col" className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tamaño</th>
              <th scope="col" className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fecha de modificación</th>
            </tr>
          </thead>
  
          <tbody>
            {ficheros.map((file) => (
              <tr key={file.id}>
                <td>
                  <Download file={file} />
                </td>
                <td>{file.descripcion}</td>
                <td><img src={file.tipo} height="28px" width="28px" alt="icono" /></td>
                <td>{file.size}</td>
                <td>{file.fCreacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}