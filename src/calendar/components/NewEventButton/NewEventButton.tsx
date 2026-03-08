import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../../hooks";
import "./NewEventButton.css";
export const NewEventButton = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClick = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
    });
    openDateModal();
  };
  return (
    <button className="fab btn-primary btn" onClick={handleClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
