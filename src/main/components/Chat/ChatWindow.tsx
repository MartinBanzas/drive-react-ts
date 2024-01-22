import React from "react";

import { getNombre } from "../Login/TokenHandler";
import { UsersBar } from "./UsersBar";
import { useState } from "react";

export const ChatWindow = () => {

    

    const msg = {
        sender: "Ruben",
        body: "Hola, esto es un mensaje de prueba",
        receiver: "Martin",
        date: Date.now(),
        
    };

    const msg2 = {
        sender: "Martin",
        body: "Este es un segundo mensaje de prueba",
        receiver: "Jaime",
        date: Date.now(),
     
    };

    const msg3 = {
        sender: "Mercedes",
        body: "Este es un segundo mensaje de prueba de Mercedes a Martin",
        receiver: "Martin",
        date: Date.now(),
    }

    const msg4 = {
        sender: "Martin",
        body: "Este es un segundo mensaje de prueba de Martin a Mercedes",
        receiver: "Mercedes",
        date: Date.now(),
    }

    const arr = [msg, msg2, msg3, msg4];

    const [mensaje, setMensaje]=React.useState(arr);

    const toggleUser = (username:string) => {
    const userSelected =    arr.filter((element)=>  element.sender==username || element.sender==getNombre);

    setMensaje(userSelected);
    }

   


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
            {mensaje.map((message) => (
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
            <button className="btn btn-primary btn-sm mt-2">Enviar</button>
            <UsersBar toggleUser={toggleUser}/>
            
        </div>
    );
};