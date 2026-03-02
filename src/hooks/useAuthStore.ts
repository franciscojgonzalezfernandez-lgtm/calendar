import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, status } = useSelector((state) => state.auth);

  const startLogin = async (email, password) => {
    console.log("Starting login with", email, password);
    // TODO - Implement login logic, e.g. call login API, dispatch loginSuccess on success, handle errors
    try {
      const response = await calendarApi.post("/auth/login", {
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return {
    isAuthenticated,
    user,
    status,
    // Methods
    startLogin,
  };
};
