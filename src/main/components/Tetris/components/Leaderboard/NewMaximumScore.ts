import { getUsername } from "../../../Login/TokenHandler";
import UserModel from "../../../../../models/UserModel";


const username = getUsername;

const compareScore = (score:number, playerList:UserModel[]) => {
    for (const player of playerList) {
      if (score > player.puntuacion && username === player.nombre) {
        return true;
      }
    }
    return false;
  };
  
    


export const handleNewMaximumScore = (score:number, playerList:UserModel[]) => {

    if (compareScore(score, playerList)) {

    const apiUrl = 'http://tu-api-rest.com/tu-recurso/123';  // Reemplaza con la URL de tu recurso específico



    const newData = {
      nombre:username,
      puntuacion:score
    };
    

    fetch(apiUrl, {
      method: 'PATCH',  // O 'PUT' según tus necesidades
      headers: {
        'Content-Type': 'application/json',
      
      },
      body: JSON.stringify(newData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al actualizar el recurso');
      }
      return response.json();
    })
    .then(data => {
      // Manejar la respuesta del servidor después de la actualización
      console.log('Recurso actualizado correctamente', data);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
}}