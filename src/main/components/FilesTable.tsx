import React, { useEffect, useState } from "react";
import FicheroModel from "../../models/FicheroModel";
import { Download } from "../utils/Download";



export const FilesTable = () => {
  const [ficheros, setFicheros] = useState<FicheroModel[]>([]);
  const [httpError, setHttpError] = useState(null);
  const r = "../../../../Proyectos/Drive/uploads/";

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
    <div>
      {ficheros.map((file) => (
        <div key={file.id}>
          <Download file={file}/>
          <p>{file.descripcion}</p>
        </div>
      ))}
      <img src="../../../../Proyectos/Drive/uploads/cat-2083492_1280.jpg"/>
    </div>
  );
};