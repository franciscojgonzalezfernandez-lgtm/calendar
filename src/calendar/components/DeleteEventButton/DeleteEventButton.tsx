import { useCalendarStore } from "../../../hooks";
import "./DeleteEventButton.css";
export const DeleteEventButton = () => {
  const { startDeletingEvent } = useCalendarStore();
  const handleClick = () => {
    startDeletingEvent();
  };
  return (
    <button className="fab-danger btn-danger" onClick={handleClick}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
