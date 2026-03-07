import { useDispatch, useSelector } from "react-redux";
import type { ExtendedEvent } from "../interfaces/ExtendedEvent.interface";
import {
  onSetActiveEvent,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
} from "../store";
import { calendarApi } from "../api";

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

    if (calendarEvent._id) {
      const { data } = await calendarApi.put(
        `/events/${calendarEvent._id}`,
        calendarEvent,
      );
      console.log(data);
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Creating
      const { data } = await calendarApi.post("/events/new", calendarEvent);
      console.log(data);
      dispatch(onCreateEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = async () => {
    // Esperar al backend
    dispatch(onDeleteEvent());
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
