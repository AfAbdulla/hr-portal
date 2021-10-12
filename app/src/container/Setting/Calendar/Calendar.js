import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "@fullcalendar/daygrid/main.css";

function Calendar() {

    return (
        <Aux>
            <div className="calendar">
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                />
            </div>
        </Aux>
    );
}

export default Calendar
