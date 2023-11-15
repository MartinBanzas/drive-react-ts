import React, { useEffect, useState } from "react";
import FicheroModel from "../../models/FicheroModel";
import { Download } from "../utils/Download";
import {formatFecha, formatSize} from "../utils/Utils";


export const FilesTable = () => {
  const [ficheros, setFicheros] = useState<FicheroModel[]>([]);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchFicheros = async () => {
      const baseUrl: string = "http://localhost:8081/api/ficheroes";
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
          tipo: responseData[key].tipo,
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

  const ultimosFicheros = ficheros.slice(-7);

  return (
    <div className="container-sm overflow-auto bg-white rounded ">
      <div >
     
      <div className="card mb-3 mw-20"  >
  <div className="row g-0">
    <div className="col-md-4">
      <img src="..." className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
      
      </div>
      <table className="table table-striped rounded align-items-center ">
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
              <td>{file.tipo}</td>
              <td>{file.size}</td>
              <td>{file.fCreacion}</td>
            </tr>

          )

          )}


        </tbody>
      </table>
    </div>
  );

}