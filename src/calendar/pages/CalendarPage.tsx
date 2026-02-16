import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { Event, EventPropGetter, View } from "react-big-calendar";

import { DeleteEventButton, NavBar, NewEventButton } from "../index";
import { CalendarEvent } from "../index";
import { localizer } from "../../helpers";
import { getMessages } from "../../helpers";
import { useState } from "react";
import type { ExtendedEvent } from "../../interfaces/ExtendedEvent.interface";
import { CalendarModal } from "../index";
import { useCalendarStore, useUiStore } from "../../hooks";

const myEventStyleGetter: EventPropGetter<Event> = (
  event: Event,
  start: Date,
  end: Date,
  isSelected: boolean,
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
  const { openDateModal, isDateModalOpen } = useUiStore();
  const { events, activeEvent, setActiveEvent } = useCalendarStore();
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(
    getStoredView("CalendarView", Views.MONTH),
  );
  const onViewChange = (view: View) => {
    localStorage.setItem("CalendarView", view);
    setView(view);
  };
  const onSelect = (event: ExtendedEvent) => {
    setActiveEvent(event);
  };
  const onDoubleClick = (event: ExtendedEvent) => {
    openDateModal();
  };
  return (
    <>
      <NavBar />
      <CalendarModal />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
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
      <NewEventButton />
      {activeEvent && !isDateModalOpen && <DeleteEventButton />}
    </>
  );
};
