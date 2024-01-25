import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Button, Modal } from "react-bootstrap";

export const CalendarMain = () => {
  const initialEvents = [
    { id: nanoid(), title: "Evento de prueba", date: "2024-01-26" },
    {
      id: nanoid(),
      title: "Evento de prueba 2",
      date: "2024-01-26",
      start: new Date(),
    },
  ];

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [events, setEvents] = useState(initialEvents);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddEvent, setShowAddEvent]=useState(false);


  const handleDateClick = (arg: { dateStr: any }) => {
 setShowAddEvent(true);
  };

  function handleDateSelect(arg: DateSelectArg): void {
    console.log("Hola");
  }

  function handleEventClick(arg: EventClickArg): void {
    setShowDeleteConfirmation(true);
    setSelectedEventId(arg.event.id);
  }

  function handleEvents(events: EventApi[]): void {
    console.log("handleEvents");
  }

  const handleConfirm = () => {
    // Filtra los eventos eliminando el evento con el ID seleccionado
    const newEvents = events.filter((evento) => evento.id !== selectedEventId);
    setEvents(newEvents);
    setShowDeleteConfirmation(false);
  };


  return (
    <div className="container mt-7 bg-white w-50">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        locale={"es"}
        aspectRatio={2}
        dateClick={handleDateClick}
        editable={true}
        selectable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
      />

      <Modal show={showDeleteConfirmation} onHide={()=>setShowDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Quieres eliminar el evento?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowDeleteConfirmation(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showAddEvent} onHide={()=>setShowAddEvent(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir evento</Modal.Title>
        </Modal.Header>
        <Modal.Body><input type="text"/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowAddEvent(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
  );
};
