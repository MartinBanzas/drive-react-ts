import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { AddCard } from "./AddCard";
import { Card } from "./Card";
import { DragDropContext, Droppable, Draggable, DropResult, DraggableLocation } from "react-beautiful-dnd";
import {  setDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import  './utils/spacing.css';
import { db, cardCollection } from "./utils/firebase";

export const ListContainer = () => {

  const [lists, setLists] = useState<any>([]);
  const saveToFirebase = async (data: any) => {
    try {
      const docRef = doc(db, 'tarjetas', 'pruebas');
      const dataToSave = { lists: data }; 
      await setDoc(docRef, dataToSave);
      console.log('Datos guardados en Firestore:', dataToSave);
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
    }
  };

useEffect(() => {
  const unsubscribe = onSnapshot(doc(db, 'tarjetas', 'pruebas'), (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      const formattedData = {
        lists: data.lists.map((list: any) => ({
          ...list,
          cards: list.cards.map((card: any) => ({
            ...card,
          })),
        })),
      };
      setLists(formattedData.lists);
      console.log('Datos recibidos de Firebase:', formattedData);
    } else {
      console.log('No hay datos en Firebase.');
    }
  });

  return unsubscribe;
}, []);

  const createList = () => {
    const newList = {
      title: "Click to edit me",
      id: nanoid(),
      editMode: false,
      cards: [],
    };
    console.log(newList); 
    setLists([...lists, newList]);
  };

  const deleteCard = (idCard: String) => {
    const updatedLists = lists.map((list: { id: string; title: string; cards: { text: string; idCard: string }[] }) => ({
      ...list,
      cards: list.cards.filter((card) => card.idCard !== idCard),
    }));

    setLists(updatedLists);
   saveToFirebase(lists);
  };



  const handleTitleEditSave = (index: String) => {
    const updatedLists = lists.map((list: { id: string; editMode:boolean, title: string; cards: { text: string; idCard: string }[] }) => {
      if (list.id === index) {
        return { ...list, title: list.title, editMode: false };
      }
      return list;
    });
    setLists(updatedLists);
    saveToFirebase(lists);

   
  };

  const handleTitleClick = (indexEvento: String) => {
   
    const updatedLists = lists.map((list: { id: string; editMode:boolean, title: string; cards: { text: string; idCard: string }[] }) => {
     
      if (list.id === indexEvento) {
        return { ...list, editMode: true };
      }
      return list;
    });
    setLists(updatedLists);
    saveToFirebase(lists);

   
  };

  const addCard = (text: String, listId: String) => {
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
    saveToFirebase(lists);

     
 };

  const editCard=(idCard: String, newText: String) =>{
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
    saveToFirebase(lists);

  
  }
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    const move = (source: any[], destination: any[], droppableSource: any, droppableDestination: any) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);

      destClone.splice(droppableDestination.index, 0, removed);

      const result: any = {};
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;

      return result;
    };

    if (source.droppableId === destination.droppableId) {
      // Movement on same list
      const listIndex = lists.findIndex((list: { id: string; title: string; cards: { text: string; idCard: string }[] }) => list.id === source.droppableId);
      if (listIndex !== -1) {
        const list = lists[listIndex];
        const updatedCards = [...list.cards];
        const [movedCard] = updatedCards.splice(source.index, 1);
        updatedCards.splice(destination.index, 0, movedCard);
        const updatedLists = [...lists];
        updatedLists[listIndex] = { ...list, cards: updatedCards };
        setLists(updatedLists);
        saveToFirebase(lists);

        
      }
    } else {
      // Movement among different lists
      const sourceListIndex = lists.findIndex((list: { id: string; title: string; cards: { text: string; idCard: string }[] }) => list.id === source.droppableId);
      const destinationListIndex = lists.findIndex((list: { id: string; title: string; cards: { text: string; idCard: string }[] }) => list.id === destination.droppableId);

      if (sourceListIndex !== -1 && destinationListIndex !== -1) {
        const sourceList = lists[sourceListIndex];
        const destinationList = lists[destinationListIndex];
        const updatedSourceCards = [...sourceList.cards];
        const updatedDestinationCards = [...destinationList.cards];


        const [movedCard] = updatedSourceCards.splice(source.index, 1);
        updatedDestinationCards.splice(destination.index, 0, movedCard);

        const updatedLists = [...lists];
        updatedLists[sourceListIndex] = { ...sourceList, cards: updatedSourceCards };
        updatedLists[destinationListIndex] = { ...destinationList, cards: updatedDestinationCards };

        setLists(updatedLists);
        saveToFirebase(lists);

   
           }
    }
  };


  return (
    <div className="">
      <div>
        <button className="btn btn-primary position-absolute top-10 end-1 p-1 " onClick={createList}>
          Crear Lista
        </button>
      </div>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <div className="ml-1 d-flex justify-content-center flex-row rounded row-cols-1 row-cols-sm-2  row-cols-md-5 flex-wrap gap-3 mt-5 spacing">
          {lists.map((list: { id: string; editMode:boolean, title: string; cards: { text: string; idCard: string }[] },index:any) => (
            <Droppable droppableId={list.id} key={list.id}>
              {(provided) => (
                <div ref={provided.innerRef} className="col mb-4" key={list.id}>
                  <div className="card">
                    <div className="card-header bg-primary text-white font-italic font-weight-bold text-center">
                      {list.editMode ? (
                        <div>
                          <input
                            type="text"
                            required
                            className="form-control bg-white"
                            value={list.title}
                            onChange={(e) => {
                              const updatedLists = lists.map((item:any, i:any) => {
                                if (i === index) {
                                  return {
                                    ...item,
                                    title: e.target.value,
                                  };
                                }
                                return item;
                              });
                              setLists(updatedLists);
                            }}
                          />
                          <button className="btn btn-primary btn-sm" onClick={() =>handleTitleEditSave(list.id)}>
                            Save
                          </button>
                      
                        </div>
                      ) : (
                        <h5 onClick={() => handleTitleClick(list.id)} className="card-title">{list.title}</h5>
                      )}
                    </div>
                    <div className="card-body">
                      {list.cards.map((card, index) => (
                        <Draggable key={card.idCard} draggableId={card.idCard} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-3"
                              key={card.idCard}
                            >
                              <Card idCard={card.idCard} key={card.idCard} text={card.text} deleteCard={deleteCard} editCard={editCard} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <AddCard addTask={(text: String) => addCard(text, list.id)} />
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );}