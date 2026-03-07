import { useDispatch, useSelector } from "react-redux";
import type { ExtendedEvent } from "../interfaces/ExtendedEvent.interface";
import {
  onSetActiveEvent,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} from "../store";
import { calendarApi } from "../api";
import Swal from "sweetalert2";
import { convertEventsToNumber } from "../helpers/ConvertEventsToDate";

export const useCalendarStore = () => {
  const activeEvent = useSelector(
    (state) => state.calendar.activeEvent,
  ) as ExtendedEvent;

  const events = useSelector(
    (state) => state.calendar.events,
  ) as ExtendedEvent[];

  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent: ExtendedEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: ExtendedEvent) => {
    //TODO call the backend.

    if (calendarEvent.id) {
      try {
        const { data } = await calendarApi.put(
          `/events/${calendarEvent.id}`,
          calendarEvent,
        );
        dispatch(onUpdateEvent({ ...calendarEvent }));
      } catch (error) {
        Swal.fire("Error", "Failed to update event", "error");
        console.log(error);
      }
    } else {
      try {
        const { data } = await calendarApi.post("/events/new", calendarEvent);
        dispatch(
          onCreateEvent({ ...calendarEvent, _id: new Date().getTime() }),
        );
      } catch (error) {
        Swal.fire("Error", "Failed to create event", "error");
        console.log(error);
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
      console.log(error);
    }
  };

  const loadEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events/all");
      const parsedEvents = convertEventsToNumber(data.events);
      dispatch(onLoadEvents(parsedEvents));
    } catch (error) {
      Swal.fire("Error", "Failed to load events", "error");
      console.log(error);
    }
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    loadEvents,
  };
};
