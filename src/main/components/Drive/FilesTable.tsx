import React, { useEffect, useState, useCallback } from "react";
import FicheroModel from "../../../models/FicheroModel";
import { Download } from "./Download";
import { formatFecha, formatSize, getImg } from "./utils/Utils";
import { FileRejection, useDropzone } from 'react-dropzone'



export const FilesTable = () => {
  const [ficheros, setFicheros] = useState<FicheroModel[]>([]);
  const [httpError, setHttpError] = useState(null);
  const [newUpload, setNewUpload]=useState(false);

  //File Upload handling
  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: FileRejection[], event: any) => {   
    event.preventDefault();
    event.stopPropagation();
    const file = new FileReader;
    file.readAsDataURL(acceptedFiles[0]);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    
    try {
      const response = await fetch("http://localhost:8082/drive/new/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log(response);
        console.log("File uploaded successfully");
        setNewUpload(true);
        fetchFicheros();
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file", error);
    }
    setNewUpload(true);
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

  //Fetch data for the file table
const fetchFicheros = useCallback(async () => {
  const baseUrl: string = "http://localhost:8081/api/ficheroes";
  const url: string = `${baseUrl}`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Algo ha ido mal');
    }

    const responseJson = await response.json();
    const responseData = responseJson._embedded.ficheroes;

    const loadedFiles: FicheroModel[] = [];

    for (const key in responseData) {
      loadedFiles.push({
        id: responseData[key].id,
        descripcion: responseData[key].descripcion,
        ruta: responseData[key].ruta,
        tipo: getImg(responseData[key].tipo),
        size: formatSize(responseData[key].size),
        fCreacion: formatFecha(responseData[key].fcreacion),
      });
    }

    setFicheros(loadedFiles);
  } catch (error) {
   
  }
}, []);

//Initial load of data with fetchFicheros
useEffect(() => {
  fetchFicheros();
}, [fetchFicheros]);

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }
  const ficherosDestacados = ficheros.slice(-3);
  const baseUrl = "http://localhost:8081/drive";

  return (
    <div>
    <div className="container-md text-center mt-4 bg-white rounded">
      <div className="container-sm">
        <div className="row">
          {ficherosDestacados.map((file, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card mw-20 mt-3 h-100 ">
                <div className="row g-0">
                  <div className="col-md-4">
                    <a className="card-title" href={`${baseUrl}/get/${file.id}`} download={file.ruta}>
                      <img src={file.tipo} height={96} width={96} className="img-fluid rounded-start mt-4" alt="..." />
                    </a>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <a className="card-title" href={`${baseUrl}/get/${file.id}`} download={file.ruta}>
                        <h5 className="card-title">{file.ruta}</h5>
                      </a>
                      <p className="card-text">{file.fCreacion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div {...getRootProps()} className="table-container" style={{ overflowY: "auto", maxHeight: "550px" }}>
      <input {...getInputProps()} />
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
                <td><Download file={file}/> </td>
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
   
 </div>
  );
}
