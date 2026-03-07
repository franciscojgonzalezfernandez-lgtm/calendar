import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { Event, EventPropGetter, View } from "react-big-calendar";

import { DeleteEventButton, NavBar, NewEventButton } from "../index";
import { CalendarEvent } from "../index";
import { localizer } from "../../helpers";
import { getMessages } from "../../helpers";
import { useEffect, useState } from "react";
import type { ExtendedEvent } from "../../interfaces/ExtendedEvent.interface";
import { CalendarModal } from "../index";
import { useCalendarStore, useUiStore, useAuthStore } from "../../hooks";

const isValidView = (value: string | null): value is View =>
  Object.values(Views).includes(value as View);

const getStoredView = (key: string, fallback: View): View => {
  const stored = localStorage.getItem(key);
  return isValidView(stored) ? stored : fallback;
};

export const CalendarPage = () => {
  const { openDateModal, isDateModalOpen } = useUiStore();
  const { events, activeEvent, setActiveEvent, loadEvents } =
    useCalendarStore();
  const { uid } = useAuthStore();
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

  const myEventStyleGetter: EventPropGetter<Event> = (
    event: Event,
    start: Date,
    end: Date,
    isSelected: boolean,
  ) => {
    const isMyEvent = (event: ExtendedEvent) => {
      return event.user?.id === uid || event.user?._id === uid;
    };
    return {
      style: {
        backgroundColor: isMyEvent(event) ? "lightblue" : "lightgray",
      },
    };
  };

  useEffect(() => {
    //TODO - Load events from backend
    loadEvents();
  }, []);
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
