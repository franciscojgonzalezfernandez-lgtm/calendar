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

  const startRegister = async (email, password, name) => {
    console.log("Starting registration with", email, password, name);
    // TODO - Implement registration logic, e.g. call register API, dispatch loginSuccess on success, handle errors
    try {
      const response = await calendarApi.post("/auth/new", {
        email,
        password,
        name,
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
      console.error("Registration failed:", error);
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        const firstErrorKey = Object.keys(apiErrors)[0];
        const errorMessages =
          apiErrors[firstErrorKey].msg || "Registration failed";
        dispatch({
          type: "auth/logout",
          payload: { error: errorMessages },
        });
        return;
      }
      dispatch({
        type: "auth/logout",
        payload: { error: "Registration failed" },
      });
      setTimeout(() => {
        dispatch({ type: "auth/clearErrorMessage" });
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
    startRegister,
  };
};
