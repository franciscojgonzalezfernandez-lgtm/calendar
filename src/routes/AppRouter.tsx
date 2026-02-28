import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
  const authStatus = "not-authenticated"; // TODO: get from store
  return (
    <Routes>
      {authStatus == "not-authenticated" ? (
        <Route path="/auth/*" element={<LoginPage />}></Route>
      ) : (
        <Route path="/*" element={<CalendarPage />}></Route>
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />}></Route>
    </Routes>
  );
};
