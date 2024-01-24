import React from "react";

import { getNombre } from "../Login/TokenHandler";
import { UsersBar } from "./UsersBar";
import { nanoid } from "nanoid";
import {  setDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../Trello/utils/firebase";


export const ChatWindow = () => {


  const saveToFirebase = async (data:any) => {

    try {
      const docRef=doc(db, 'tarjetas', 'mensajes');
      const dataToSave = {lists: data};
      await setDoc(docRef, dataToSave);
    } catch (error) {
          console.error('Error al guardar en Firestore:', error);

    }
  }

  const [inputText, setInputText] = React.useState("");
  const [userSelected, setUserSelected] = React.useState("");
  
  const msg = {
    key: nanoid(),
    sender: "Ruben",
    body: "Hola, esto es un mensaje de prueba",
    receiver: "Martin",
    date: Date.now(),
  };

  const msg2 = {
    key: nanoid(),
    sender: "Martin",
    body: "Este es un segundo mensaje de prueba",
    receiver: "Jaime",
    date: Date.now(),
  };

  const msg3 = {
    key: nanoid(),
    sender: "Mercedes",
    body: "Este es un segundo mensaje de prueba de Mercedes a Martin",
    receiver: "Martin",
    date: Date.now(),
  };

  const msg4 = {
    key: nanoid(),
    sender: "Martin",
    body: "Este es un segundo mensaje de prueba de Martin a Mercedes",
    receiver: "Mercedes",
    date: Date.now(),
  };

  const msg5 = {
    key: nanoid(),
    sender: "Martin",
    body: "Este es un mensaje de prueba de Martin a Felipe",
    receiver: "Felipe",
    date: Date.now(),
  };

  const msg6 = {
    key: nanoid(),
    sender: "Felipe",
    body: "Este es un mensaje de prueba de Felipe a Martin",
    receiver: "Martín",
    date: Date.now(),
  };
  let allMessages = [msg, msg2, msg3, msg4, msg5, msg6];

  const [msgToShow, setMsgToShow] = React.useState(allMessages);

  const postNewMsg = (event: any) => {
    const newMsg = {
      key: nanoid(),
      sender: getNombre,
      body: inputText,
      receiver: userSelected,
      date: Date.now(),
    };
  
    const newArr = [...allMessages, newMsg];
    console.log(newArr);
  
    // Actualizar el estado msgToShow con la nueva copia
    setMsgToShow((newArr) => {
      console.log(msgToShow);
      toggleUser(userSelected);
  
      setInputText("");
    
   return newArr;
    });

   
  };
  



  const toggleUser = (username: string) => {
    setMsgToShow((prevMsgToShow) => {
      // Restablecer al estado original
      const originalMessages = allMessages;
      console.log(originalMessages);
  
      // Filtrar mensajes
      const msgFromThisUser = originalMessages.filter(
        (element) =>
          element.sender === username ||
          (element.sender === getNombre && element.receiver === username)
      );
  
      setUserSelected(username);
      return msgFromThisUser;
    });
  };


  const formatDateTime = (timestamp: any) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "UTC",
    };

    return new Date(timestamp).toLocaleDateString("es-ES");
  };

  return (
    <div className="container w-25">
      {msgToShow.map((message) => (
        <div key={message.key} className="card mt-3">
          <div
            className={`card-header ${
              getNombre === message.sender ? "bg-secondary" : "bg-primary"
            } text-white`}
          >
            {getNombre === message.receiver
              ? `${message.sender} escribió el día`
              : "Escribiste..."}
          </div>
          <div className="card-body">
            <p className="card-text">{message.body}</p>
          </div>
        </div>
      ))}
      <input
        type="text"
        className="form-text mt-3 w-100"
        onChange={(event) => setInputText(event?.target.value)}
        value={inputText}
        placeholder="Escribe aquí..."
      />
      <button className="btn btn-primary btn-sm mt-2" onClick={postNewMsg}>
        Enviar
      </button>
      <UsersBar toggleUser={toggleUser} />
    </div>
  );
};
