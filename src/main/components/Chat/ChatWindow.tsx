import React, { useEffect, useState } from "react";

import { getNombre } from "../Login/TokenHandler";
import { UsersBar } from "./UsersBar";
import { nanoid } from "nanoid";
import { setDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../utils/FirebaseConfig";


interface Message {

  key: string,
  sender: string,
  body: string,
  receiver: string,
  date: Date,
}

export const ChatWindow = () => {


  const [fireBaseMessages, setFireBaseMessages] = useState<Message[]>();
  const [messagesToShow, setMessagesToShow] = useState<Message[]>();

  const saveToFirebase = async (data: any) => {

    try {
      const docRef = doc(db, 'tarjetas', 'mensajes');
      const dataToSave = { lists: data };
      await setDoc(docRef, dataToSave);
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);

    }
  }

  const [inputText, setInputText] = React.useState("");
  const [userSelected, setUserSelected] = React.useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'tarjetas', 'mensajes'), (doc) => {
      if (doc.exists()) {
        const data = doc.data().lists;
        setFireBaseMessages(data);
        console.log('Datos recibidos de Firebase:', data);
      } else {
        console.log('No hay datos en Firebase.');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const postNewMsg = (event: any) => {
    const newMsg = {
      key: nanoid(),
      sender: getNombre,
      body: inputText,
      receiver: userSelected,
      date: Date.now(),
    };

    if (fireBaseMessages) {
      const newArr = [...fireBaseMessages, newMsg];
      console.log(newArr);

      setMessagesToShow((newArr) => {
        toggleUser(userSelected);

        setInputText("");

        return newArr;
      });

    }
    };


    const toggleUser = (username: string) => {
      setMessagesToShow((prevMsgToShow) => {
        if (fireBaseMessages) {
          // Filtrar mensajes
          const msgFromThisUser = fireBaseMessages.filter(
            (element) =>
              element.sender === username ||
              (element.sender === getNombre && element.receiver === username)
          );

          setUserSelected(username);
          return msgFromThisUser;
        }
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
        {messagesToShow?.map((message) => (
          <div key={message.key} className="card mt-3">
            <div
              className={`card-header ${getNombre === message.sender ? "bg-secondary" : "bg-primary"
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
    )
  };

