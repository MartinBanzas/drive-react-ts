import React, { useCallback, useEffect, useState } from "react";
import UserModel from "../../../../../models/UserModel";

export const Leaderboard = () => {
    const [puntuacion, setPuntuacion] = useState<UserModel[]>([]);

    const fetchFicheros = useCallback(async () => {
        const baseUrl: string = "http://localhost:8081/api/users";
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

            setPuntuacion(users);
        } catch (error) {
            // Manejar el error según tus necesidades
            console.error('Error al obtener datos:', error);
        }
    }, []);

    useEffect(() => {
        fetchFicheros();
    }, [fetchFicheros]);

    return (
        <div>
            {/* Renderiza la información de los usuarios según tus necesidades */}
            {puntuacion.map((user, index) => (
                <div key={index}>
                    <p>{`Nombre: ${user.nombre}, Puntuación: ${user.puntuacion}`}</p>
                </div>
            ))}
        </div>
    );
};