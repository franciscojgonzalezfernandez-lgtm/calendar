import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { Event, EventPropGetter, View } from "react-big-calendar";
import { addHours } from "date-fns";

import { NavBar } from "../components/NavBar";
import { CalendarEvent } from "../components/CalendarEvent";
import { localizer } from "../../helpers";
import { getMessages } from "../../helpers";
import { useState } from "react";
import type { ExtendedEvent } from "../../interfaces/ExtendedEvent.interface";

const myEventsList: ExtendedEvent[] = [
  {
    title: "Javi's Birthday",
    start: new Date(),
    end: addHours(new Date(), 2),
    user: {
      id: "123",
      name: "Javier",
    },
  },
];

const myEventStyleGetter: EventPropGetter<Event> = (
  event: Event,
  start: Date,
  end: Date,
  isSelected: boolean
) => {
  console.log({ event, start, end, isSelected });
  return {
    style: {
      backgroundColor: isSelected ? "red" : "lightblue",
    },
  };
};

export const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(Views.MONTH);
  return (
    <>
      <NavBar />
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={getMessages()}
        eventPropGetter={myEventStyleGetter}
        date={date}
        view={view}
        onNavigate={(date) => setDate(date)}
        onView={(view) => setView(view)}
        components={{
          event: CalendarEvent,
        }}
      />
    </>
  );
};
