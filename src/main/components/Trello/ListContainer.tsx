import { useState } from "react";
import { nanoid } from "nanoid";
import { AddCard } from "./AddCard";
import { Card } from "./Card";

export const ListContainer = () => {
  const localStorageJSON = localStorage.getItem("card");
  const userData = localStorageJSON ? JSON.parse(localStorageJSON) : [];
  const [lists, setLists] = useState(userData);

  const saveTasksToLocalStorage = (updatedCards: {}) =>
    localStorage.setItem("card", JSON.stringify(updatedCards));

  const createList = () => {
    const newList = {
      title: "Click to edit me",
      id: nanoid(),
      cards: [],
    };
    setLists([...lists, newList]);
  };

  const deleteCard = (idCard:String) => {
    const updatedLists = lists.map((list: { id: string; title: string; cards: { text: string; idCard: string }[] }) => ({
      ...list,
      cards: list.cards.filter((card) => card.idCard !== idCard),
    }));

    setLists(updatedLists);
    saveTasksToLocalStorage(updatedLists);
  };

  const addCard = (text:String, listId:String) => {
    const newCard = { text, idCard: nanoid() };
    const updatedLists = lists.map(((list: { id: string; title: string; cards: { text: string; idCard: string }[] }) => {
      if (listId === list.id) {
        return {
          ...list,
          cards: [...list.cards, newCard],
        };
      }
      return list;
    }));

    setLists(updatedLists);
    saveTasksToLocalStorage(updatedLists);
  };

  function editCard(idCard:String, newText:String) {
    const updatedLists = lists.map((list: { id: string; title: string; cards: { text: string; idCard: string }[] }) => {
      const updatedCards = list.cards.map((card) => {
        if (idCard === card.idCard) {
          return { ...card, text: newText };
        }
        return card;
      });

      return {
        ...list,
        cards: updatedCards,
      };
    });

    setLists(updatedLists);
    saveTasksToLocalStorage(updatedLists);
  }

  return (
    <div className="container">
      <div>
        <button className="btn btn-primary position-absolute top-10 end-1 p-1" onClick={createList}>
          Crear Lista
        </button>
      </div>
  
      <div className="rounded row row-cols-1 row-cols-sm-2 row-cols-md-4 gap-3 mt-5 mx-3">
        {lists.map((list: { id: string; title: string; cards: { text: string; idCard: string }[] }) => (
          <div className="col mb-4" key={list.id}>
            <div className="card h-100">
              <div className="card-header bg-primary text-white font-italic font-weight-bold text-center">
                <h5 className="card-title">{list.title}</h5>
              </div>
              <div className="card-body">
                {list.cards.map((card, cardIndex) => (
                  
                  <div className="mb-3" key={card.idCard}>
                    <Card idCard={card.idCard} text={card.text} deleteCard={deleteCard} editCard={editCard} />
                    
                    
                  </div>
                  
                ))}
                <AddCard addTask={(text:String) => addCard(text, list.id)}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );}