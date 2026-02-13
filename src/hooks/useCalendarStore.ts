import { useDispatch, useSelector } from "react-redux";
import type { ExtendedEvent } from "../interfaces/ExtendedEvent.interface";
import { onSetActiveEvent } from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);

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
