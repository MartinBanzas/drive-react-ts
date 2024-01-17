import React, { useCallback, useEffect, useState } from "react";
import UserModel from "../../../../../models/UserModel";
import { Modal } from "react-bootstrap";

interface LeaderboardProps {
    isOpen: boolean;
    onClose:Function;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ isOpen, onClose }) => {

    const [showModal, setShowModal] = useState(isOpen);

   
    const handleShow = () => setShowModal(true);
    const [puntuacion, setPuntuacion] = useState<UserModel[]>([]);
    const [open, setOpen] = React.useState(false);
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

    return (
        <Modal show={isOpen} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Leaderboard</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="container table table-success align-items-center">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Puntuación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {puntuacion.map((user) => (
                            <tr key={user.puntuacion}>
                                <td>{user.nombre}</td>
                                <td>{user.puntuacion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
        
        </Modal>
    );
};