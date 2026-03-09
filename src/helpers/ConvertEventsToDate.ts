import type { ExtendedEvent } from "../interfaces/ExtendedEvent.interface";

export const convertEventsToNumber = (
  events: ExtendedEvent[],
): ExtendedEvent[] => {
  return events.map((event: ExtendedEvent) => ({
    ...event,
    start: event.start ? new Date(event.start as any) : undefined,
    end: event.end ? new Date(event.end as any) : undefined,
  }));
};
