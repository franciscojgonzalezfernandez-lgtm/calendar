import { useDispatch, useSelector } from "react-redux";
import type { ExtendedEvent } from "../interfaces/ExtendedEvent.interface";
import { onSetActiveEvent, onCreateEvent } from "../store";

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
      // We are updating
    } else {
      // Creating
      dispatch(onCreateEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
  };
};
