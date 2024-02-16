import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

interface ModalRenameProps {
    showModalRename: boolean;
    setShowModalRename: React.Dispatch<React.SetStateAction<boolean>>;
   
    
}

export const ModalRename: React.FC<ModalRenameProps> = ({ showModalRename, setShowModalRename }) => {
    const [newEvent, setNewEvent] = useState("");

    const handleNewEvent = () => {
        // Lógica para manejar el nuevo evento
    };
/*
    useEffect(() => {
        if (showModalRename) {
            hideContextMenu(); // Ocultar el menú contextual al mostrar el modal
        }
    }, [showModalRename, hideContextMenu]);
*/
    return (
        <Modal show={showModalRename} onHide={() => setShowModalRename(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Renombrar archivo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    value={newEvent}
                    onChange={(event) => setNewEvent(event.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModalRename(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleNewEvent}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};