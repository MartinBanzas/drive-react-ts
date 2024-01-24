import React, { useState } from "react";
import { getNombre } from "../Login/TokenHandler";
import { UsersBar } from "./UsersBar";
import { nanoid } from "nanoid";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../Trello/utils/firebase";

export const ChatWindow = () => {
  const [inputText, setInputText] = useState("");
  const [userSelected, setUserSelected] = useState("");

  const msg = (sender:string, receiver:string, body:string) => ({
    key: nanoid(),
    sender,
    body,
    receiver,
    date: Date.now(),
  });

  const allMessages = [
    msg("Ruben", "Martin", "Hola, esto es un mensaje de prueba"),
    msg("Martin", "Jaime", "Este es un segundo mensaje de prueba"),
    msg("Mercedes", "Martin", "Mensaje de Mercedes a Martin"),
    msg("Martin", "Mercedes", "Mensaje de Martin a Mercedes"),
    msg("Martin", "Felipe", "Mensaje de Martin a Felipe"),
    msg("Felipe", "Martin", "Mensaje de Felipe a Martin"),
  ];

  const [msgToShow, setMsgToShow] = useState(allMessages);

  const saveToFirebase = async (data:any) => {
    try {
      const docRef = doc(db, "tarjetas", "mensajes");
      const dataToSave = { lists: data };
      await setDoc(docRef, dataToSave);
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
    }
  };

  const postNewMsg = (event:any) => {
    const newMsg = msg(getNombre, userSelected, inputText);
    const newArr = [...allMessages, newMsg];

    setMsgToShow(newArr);
    saveToFirebase(newArr);
    setInputText("");
  };

  const toggleUser = (username:string) => {
    setMsgToShow((prevMsgToShow) => {
      const filteredMessages = allMessages.filter(
        (element) =>
          element.sender === username ||
          (element.sender === getNombre && element.receiver === username)
      );

      setUserSelected(username);
      return filteredMessages;
    });
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
