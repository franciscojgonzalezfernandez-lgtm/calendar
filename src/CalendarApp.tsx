import { BrowserRouter } from "react-router";
import { AppRouter } from "./routes";

export const CalendarApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
