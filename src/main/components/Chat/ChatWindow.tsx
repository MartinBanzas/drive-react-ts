import React from "react";

import { getNombre } from "../Login/TokenHandler";
import { UsersBar } from "./UsersBar";

export const ChatWindow = () => {

    console.log(getNombre);
    const msg = {
        sender: "Ruben",
        body: "Hola, esto es un mensaje de prueba",
        receiver: "Martin",
        date: Date.now(),
        
    };

    const msg2 = {
        sender: "Martin",
        body: "Este es un segundo mensaje de prueba",
        receiver: "Ruben",
        date: Date.now(),
     
    };

    const arr = [msg, msg2];

    const formatDateTime = (timestamp:any) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
            timeZone: "UTC"
        };

        return new Date(timestamp).toLocaleDateString("es-ES");
    };

    return (
        <div className="container w-25">
            {arr.map((message) => (
                <div key={message.date} className="card mt-3">
                    <div
                        className={`card-header ${
                            getNombre==message.receiver ? "bg-primary" : "bg-secondary"
                        } text-white`}
                    >
                   
                        {  getNombre==message.receiver ? `${message.sender} escribió el día` : "Escribiste..."}
                        
                    </div>
                    <div className="card-body">
                        <p className="card-text">{message.body}</p>
                    </div>
                </div>
            ))}
            <input type="text" className="form-text mt-3 w-100" placeholder="Escribe aquí..."/>
            <UsersBar/>
        </div>
    );
};