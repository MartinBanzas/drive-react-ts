import UserModel from "../../../../../models/UserModel";


export const fetchResults = async () => {
    const baseUrl: string = "http://localhost:8080/api/users";
    const url: string = `${baseUrl}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Algo ha ido mal');
        }

        const responseJson = await response.json();
        const responseData = responseJson._embedded.users;
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
        return [];
    }
};

