import type { ExtendedEvent } from "../../interfaces/ExtendedEvent.interface";

interface props {
  event: ExtendedEvent;
}

export const CalendarEvent = ({ event }: props) => {
  const { title, user } = event;
  return (
    <>
      <strong>{title}</strong>
      {user && <span> - {user.name} </span>}
    </>
  );
};
