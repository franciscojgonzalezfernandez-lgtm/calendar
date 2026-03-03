import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, status, errorMessage } = useSelector(
    (state) => state.auth,
  );

  const startLogin = async (email, password) => {
    console.log("Starting login with", email, password);
    // TODO - Implement login logic, e.g. call login API, dispatch loginSuccess on success, handle errors
    dispatch({ type: "auth/checkingCredentials" }); // Set status to checking
    try {
      const response = await calendarApi.post("/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("sessionToken", response.data.token); // Store token in localStorage
      dispatch({
        type: "auth/loginSuccess",
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
    } catch (error) {
      console.error("Login failed:", error);
      dispatch({
        type: "auth/logout",
        payload: { error: "Invalid credentials" },
      }); // Clear auth state on failure
      setTimeout(() => {
        dispatch({ type: "auth/clearErrorMessage" }); // Clear error message
      }, 100);
    }
  };

  return {
    isAuthenticated,
    user,
    status,
    errorMessage,
    // Methods
    startLogin,
  };
};
