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
import { CalendarModal } from "../components/CalendarModal/CalendarModal";
import { useUiStore } from "../../hooks";

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

const onSelect = (event: ExtendedEvent) => {
  console.log({ click: event });
};

const myEventStyleGetter: EventPropGetter<Event> = (
  event: Event,
  start: Date,
  end: Date,
  isSelected: boolean
) => {
  return {
    style: {
      backgroundColor: isSelected ? "red" : "lightblue",
    },
  };
};

const isValidView = (value: string | null): value is View =>
  Object.values(Views).includes(value as View);

const getStoredView = (key: string, fallback: View): View => {
  const stored = localStorage.getItem(key);
  return isValidView(stored) ? stored : fallback;
};

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(
    getStoredView("CalendarView", Views.MONTH)
  );
  const onViewChange = (view: View) => {
    localStorage.setItem("CalendarView", view);
    setView(view);
    console.log({ View: view });
  };
  const onDoubleClick = (event: ExtendedEvent) => {
    console.log({ doubleClick: event });
    openDateModal();
  };
  return (
    <>
      <NavBar />
      <CalendarModal />
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
        onView={onViewChange}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
      />
    </>
  );
};
