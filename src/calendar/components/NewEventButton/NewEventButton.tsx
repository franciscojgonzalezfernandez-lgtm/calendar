import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../../hooks";
import "./NewEventButton.css";
export const NewEventButton = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClick = () => {
    setActiveEvent({
      title: "Hello",
      notes: "World",
      start: new Date(),
      end: addHours(new Date(), 2),
      user: {
        id: "123",
        name: "Javier",
      },
    });
    openDateModal();
  };
  return (
    <button className="fab btn-primary btn" onClick={handleClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
