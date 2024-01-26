import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Button, Modal } from "react-bootstrap";

interface EventList {
  id: string;
  title: string;
  date: string;
  start: Date;
}

export const CalendarMain = () => {
  const initialEvents: EventList[] = [
    { id: nanoid(), title: "Evento de prueba", date: "2024-01-26", start: new Date() },
    { id: nanoid(), title: "Evento de prueba 2", date: "2024-01-26", start: new Date() },
  ];

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [events, setEvents] = useState<EventList[]>(initialEvents);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newDate, setNewDate] = useState<DateSelectArg>();
  const [newEvent, setNewEvent] = useState("");

  const handleDateClick = (arg: { dateStr: any }) => {
    setShowAddEvent(true);
  };

  function handleDateSelect(arg: DateSelectArg): void {
    console.log("Hola");
    console.log(arg);
    setNewDate(arg);
  }

  function handleEventClick(arg: EventClickArg): void {
    setShowDeleteConfirmation(true);
    setSelectedEventId(arg.event.id);
  }

  const handleConfirmDelete = () => {
    // Filtra los eventos eliminando el evento con el ID seleccionado
    const newEvents = events.filter((evento) => evento.id !== selectedEventId);
    setEvents(newEvents);
    setShowDeleteConfirmation(false);
  };

  const handleNewEvent = () => {
    if (newDate) {
      const newEventList: EventList = {
        date: newDate.startStr || "",
        title: newEvent,
        id: nanoid(),
        start: new Date(),
      };
      const list = [...events, newEventList];
      setEvents(list);
      setShowAddEvent(false);
    }
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
        events={events.map((event) => ({ ...event, start: event.date }))}
        select={handleDateSelect}
        eventClick={handleEventClick}
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