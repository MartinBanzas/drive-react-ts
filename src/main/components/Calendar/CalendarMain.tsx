import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import '../../../assets/css/nucleo-icons.css'
import '../../../assets/css/nucleo-svg.css'
import '../../../assets/css/material-dashboard.css'

export const CalendarMain = ()  => {



    return  (
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
    )
}