import { useCallback, useEffect, useState } from "react";
import { Calendar, Views } from "react-big-calendar";
import type { Event, EventPropGetter, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  DeleteEventButton,
  NavBar,
  NewEventButton,
  CalendarEvent,
  CalendarModal,
} from "../index";

import { localizer, getMessages } from "../../helpers";
import { useCalendarStore, useUiStore, useAuthStore } from "../../hooks";
import type { ExtendedEvent } from "../../interfaces/ExtendedEvent.interface";

/**
 * CalendarPage
 *
 * Displays the main calendar view, loads events from the store and
 * handles user interactions (select, double click, change view).
 */

const STORAGE_KEY = "CalendarView";

const isValidView = (value: string | null): value is View =>
  Object.values(Views).includes(value as View);

const getStoredView = (key: string, fallback: View): View => {
  const stored = localStorage.getItem(key);
  return isValidView(stored) ? (stored as View) : fallback;
};

export const CalendarPage = () => {
  const { openDateModal, isDateModalOpen } = useUiStore();
  const { events, activeEvent, setActiveEvent, loadEvents } =
    useCalendarStore();
  const { uid } = useAuthStore();

  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(
    getStoredView(STORAGE_KEY, Views.MONTH),
  );

  const onViewChange = useCallback((nextView: View) => {
    localStorage.setItem(STORAGE_KEY, nextView);
    setView(nextView);
  }, []);

  const onSelect = useCallback(
    (event: ExtendedEvent) => {
      setActiveEvent(event);
    },
    [setActiveEvent],
  );

  const onDoubleClick = useCallback(() => {
    openDateModal();
  }, [openDateModal]);

  const myEventStyleGetter: EventPropGetter<Event> = useCallback(
    (event: Event) => {
      const isMyEvent = (ev: ExtendedEvent) => ev.user?.id === uid;
      return {
        style: {
          backgroundColor: isMyEvent(event as ExtendedEvent)
            ? "lightblue"
            : "lightgray",
        },
      };
    },
    [uid],
  );

  useEffect(() => {
    // Load events from backend/store on mount
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
