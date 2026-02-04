import type { Event } from "react-big-calendar";

interface props {
  event: Event;
}

export const CalendarEvent = ({ event }: props) => {
  const { title, user } = event;
  console.log(event);
  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name} </span>
    </>
  );
};
