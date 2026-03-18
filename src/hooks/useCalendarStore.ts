import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { ExtendedEvent } from "../interfaces/ExtendedEvent.interface";
import {
  onSetActiveEvent,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} from "../store";
import { calendarApi } from "../api";
import Swal from "sweetalert2";
import { convertEventsToNumber } from "../helpers/ConvertEventsToDate";

export const useCalendarStore = () => {
  const activeEvent = useAppSelector(
    (state) => state.calendar.activeEvent,
  ) as ExtendedEvent | null;

  const events = useAppSelector(
    (state) => state.calendar.events,
  ) as ExtendedEvent[];

  const dispatch = useAppDispatch();

  const setActiveEvent = (calendarEvent: ExtendedEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (
    calendarEvent: ExtendedEvent,
    user: { id: string; name: string },
  ) => {
    //TODO call the backend.

    if (calendarEvent.id) {
      try {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent }));
      } catch (error: any) {
        Swal.fire("Error", "Failed to update event", "error");
      }
    } else {
      try {
        const { data } = await calendarApi.post("/events/new", calendarEvent);

        // Backend returns the created event in data.event
        const returnedEvent = data?.event;

        const createdEvent: ExtendedEvent = {
          ...calendarEvent,
          id: returnedEvent?.id ?? returnedEvent?._id ?? new Date().getTime(),
          user: { id: user.id, name: user.name },
        } as ExtendedEvent;

        dispatch(onCreateEvent(createdEvent));
      } catch (error) {
        Swal.fire("Error", "Failed to create event", "error");
      }
      // Creating
    }
  };

  const startDeletingEvent = async () => {
    if (!activeEvent) return;

    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      Swal.fire("Error", "Failed to delete event", "error");
    }
  };

  const loadEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events/all");
      const parsedEvents = convertEventsToNumber(data.events);
      dispatch(onLoadEvents(parsedEvents));
    } catch (error) {
      Swal.fire("Error", "Failed to load events", "error");
    }
  };

  const logoutCalendar = () => {
    dispatch(onLogoutCalendar());
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    logoutCalendar,
    startSavingEvent,
    startDeletingEvent,
    loadEvents,
  };
};
