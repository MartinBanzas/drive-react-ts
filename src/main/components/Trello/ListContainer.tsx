import { useState } from "react";
import { nanoid } from "nanoid";

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

  return (
    <div className="container">
      <div>
        <button className="btn btn-primary position-absolute top-10 end-1 p-1" onClick={createList}>
          Crear Lista
        </button>
      </div>
  
      <div className="rounded row row-cols-1 row-cols-sm-2 row-cols-md-6 gap-3 mt-5 mx-3">
        {lists.map((list: { id: string; title: string; cards: { text: string; idCard: string }[] }) => (
          <div className="" key={list.id}>
            <div className="card">
              <div className="card-header font-italic font-weight-bold text-center">
                <h5 className="card-title">{list.title}</h5>
              </div>
              <div className="shadow-sm card-body">
                {list.cards.map((card, cardIndex) => (
                  <p className="card-text" key={card.idCard}>
                    {card.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );}