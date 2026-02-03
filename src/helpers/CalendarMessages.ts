import type { Messages, Event } from "react-big-calendar";

export const getMessages = (): Messages<Event> => {
  return {
    previous: "<",
    next: ">",
  };
};
