import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "@fullcalendar/daygrid/main.css";
import {mainAxios} from "../../../components/Axios/axios";

function Calendar() {

    const [events , setEvents] = useState([])

    const getDay = (year, month) => {
        mainAxios({
            method: 'get',
            url: '/day',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                month : month,
                year : year
            }
        }).then((res) => {
            let data = res.data.data;
            let events = [];
            for (let i of data) {
                if (i.jobDay === false) {
                    events.push({display: 'background' , date : i.day})
                }
            }

            setEvents(events);
            console.log(events)
        });
    }

    const handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
    }


    useEffect(() => {
    }, []);

    return (
        <Aux>
            <div className="calendar">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    dateClick={handleDateClick}
                    showNonCurrentDates = {false}
                    fixedWeekCount = {false}
                    firstDay={1}
                    events={events}
                    datesSet={(dateInfo) => {
                        let year = dateInfo.start.getFullYear();
                        let month = (dateInfo.start.getMonth() + 1 );
                        getDay(year, month)
                    }}
                />
            </div>
        </Aux>
    );
}

export default Calendar
