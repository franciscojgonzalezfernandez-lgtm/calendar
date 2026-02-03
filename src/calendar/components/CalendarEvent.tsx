import type { Event } from "react-big-calendar";

interface props {
  event: Event;
}

export const CalendarEvent = ({ event }: props) => {
  const { title, user, start, end } = event;
  console.log(event);
  return (
    <>
      <span>
        {start?.getHours()} - {end?.getHours()}
      </span>
      <strong>{title}</strong>
      <span> - {user.name} </span>
    </>
  );
};
