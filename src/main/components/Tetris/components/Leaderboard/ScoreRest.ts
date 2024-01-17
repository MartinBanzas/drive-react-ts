import UserModel from "../../../../../models/UserModel";


export const fetchResults = async () => {
    const baseUrl: string = "http://localhost:8081/api/users";
    const url: string = `${baseUrl}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Algo ha ido mal');
        }

        const responseJson = await response.json();
        const responseData = responseJson._embedded.users;
        console.log(responseData);
        const users: UserModel[] = [];

        for (const key in responseData) {
            users.push({
                nombre: responseData[key].nombre,
                puntuacion: responseData[key].puntuacion,
            });
        }

        return users;
    } catch (error) {
      
        console.error('Error al obtener datos:', error);
        return []; // Otra opción es devolver un valor por defecto en caso de error
    }
};

