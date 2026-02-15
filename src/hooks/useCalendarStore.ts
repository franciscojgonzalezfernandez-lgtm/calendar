import { useDispatch, useSelector } from "react-redux";
import type { ExtendedEvent } from "../interfaces/ExtendedEvent.interface";
import { onSetActiveEvent } from "../store";

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

  return {
    events,
    activeEvent,
    setActiveEvent,
  };
};
