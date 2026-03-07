import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  const authStatus = status;

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Checking authentication...</h3>;
  }

  return (
    <Routes>
      {authStatus == "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<CalendarPage />} />
          <Route path="/auth/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
