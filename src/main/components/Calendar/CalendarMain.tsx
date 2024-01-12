import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";


export const CalendarMain = ()  => {



    return  (
      
      <div className="container mt-5 bg-white w-50">
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        
        aspectRatio={2}
      />
      </div>
      
    )
}