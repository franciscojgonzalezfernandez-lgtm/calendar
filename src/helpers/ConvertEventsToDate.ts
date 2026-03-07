import type { ExtendedEvent } from "../interfaces/ExtendedEvent.interface";

export const convertEventsToNumber = (
  events: ExtendedEvent[],
): ExtendedEvent[] => {
  return events.map((event: ExtendedEvent) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
};
