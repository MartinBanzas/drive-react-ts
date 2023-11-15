import React, { useEffect, useState } from "react";
import FicheroModel from "../../models/FicheroModel";
import { Download } from "../utils/Download";



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
          tipo:responseData[key].tipo,
          size:responseData[key].size
        });
      }
      setFicheros(loadedFiles);
    };

    fetchFicheros().catch((error: any) => {
      setHttpError(error.message);
    });
  }, []);

  console.log(ficheros);

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="container-sm overflow-auto bg-white rounded ">
      <table className="table table-striped rounded align-items-center ">
        <thead>
          <tr>
            <th scope="col" className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nombre</th>
            <th scope="col" className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Descripción</th>
            <th scope="col" className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tipo</th>
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
            </tr>

          )
          
          )}

          
        </tbody>
      </table>
    </div>
  );

}