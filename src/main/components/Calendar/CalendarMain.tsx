import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Button, Modal } from "react-bootstrap";
import { collection, doc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../utils/FirebaseConfig";
import { getNombre, roles } from "../Login/TokenHandler";
import esLocale from '@fullcalendar/core/locales/es';


interface EventList {
  id: string;
  title: string;
  date: string;
  start: Date;
  userRoles:string;
  creator: string;
  color:string;
}

export const CalendarMain = () => {


  const saveToFirebase = async (data: any) => {

    try {
      const docRef = doc(db, 'tarjetas', 'calendario');
      const dataToSave = { lists: data };
      await setDoc(docRef, dataToSave);
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);

    }
  }


  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [eventsToShow, setEventsToShow] = useState<EventList[]>();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newDate, setNewDate] = useState<DateSelectArg>();
  const [newEvent, setNewEvent] = useState("");
  const [fireBaseEvents, setFireBaseEvents]=useState<EventList[]>();

  const handleEventClick=(arg: EventClickArg): void=> {
    setShowDeleteConfirmation(true);
    setSelectedEventId(arg.event.id);
  }

  const handleConfirmDelete = () => {
    // Filtra los eventos eliminando el evento con el ID seleccionado
    if (fireBaseEvents) {
      const updatedEvents = fireBaseEvents.filter((evento) => evento.id !== selectedEventId);
      setEventsToShow(updatedEvents);
      setFireBaseEvents(updatedEvents);
      setShowDeleteConfirmation(false);
    }
  };


  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'tarjetas', 'calendario'), (doc) => {
      if (doc.exists()) {
        const data = doc.data().lists;
        setFireBaseEvents(data);
                const filteredData = data.filter((event:any)=> event.creator==getNombre || event.userRoles=="ADMIN_ROLE")
                console.log(filteredData);

        setEventsToShow(filteredData);
        console.log('Datos recibidos de Firebase:', data);
      } else {
        console.log('No hay datos en Firebase.');
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  const saveEventsToFirestore = () => {
    if (fireBaseEvents) {
      saveToFirebase(fireBaseEvents);
    }
  };

  useEffect(() => {
    return () => {
      saveEventsToFirestore();
    };
  }, [fireBaseEvents]); // Ejecutar solo cuando cambia la variable events
  
  // Llamar a la función al inicio para guardar los eventos si ya están disponibles
  useEffect(() => {
    saveEventsToFirestore();
  }, [fireBaseEvents]);
  

  const handleNewEvent = () => {
    if (newDate) {
      const newEventList: EventList = {
        date: newDate.startStr || "",
        title: newEvent,
        id: nanoid(),
        start: new Date(),
        userRoles:roles,
        creator: getNombre,
        color: roles == "ADMIN_ROLE" ? "red" : ""
      };
      if (eventsToShow && fireBaseEvents) {
        const list = [...eventsToShow, newEventList];
        const global = [...fireBaseEvents, newEventList];
        setFireBaseEvents(global);
        setEventsToShow(list);
        setShowAddEvent(false);

      }
    }
  };

  return (
    <div className="container mt-7 bg-white w-50">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        aspectRatio={2}
        dateClick={(arg: { dateStr: any })=>setShowAddEvent(true)}
        editable={true}
        selectable={true}
        events={eventsToShow?.map((event) => ({ ...event, start: event.date }))}
        select={(arg: DateSelectArg) => setNewDate(arg)}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
       // eventColor='#378006'
      />

      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Borrar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Quieres eliminar el evento?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddEvent} onHide={() => setShowAddEvent(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            onChange={(event) => setNewEvent(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddEvent(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleNewEvent}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};