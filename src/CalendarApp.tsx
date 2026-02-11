import { BrowserRouter } from "react-router";
import { AppRouter } from "./routes";

import { Provider } from "react-redux";

export const CalendarApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
