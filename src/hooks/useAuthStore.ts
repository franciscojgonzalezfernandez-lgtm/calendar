import { calendarApi } from "../api";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, status, errorMessage, uid } = useAppSelector(
    (state) => state.auth,
  );

  const startLogin = async (email: string, password: string) => {
    dispatch({ type: "auth/checkingCredentials" }); // Set status to checking
    try {
      const response = await calendarApi.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("sessionToken", response.data.token); // Store token in localStorage
      dispatch({
        type: "auth/loginSuccess",
        payload: {
          user: response.data.name,
          uid: response.data.uid,
          token: response.data.token,
        },
      });
    } catch (error: any) {
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

  const startRegister = async (
    email: string,
    password: string,
    name: string,
  ) => {
    // TODO - Implement registration logic, e.g. call register API, dispatch loginSuccess on success, handle errors
    try {
      const response = await calendarApi.post("/auth/new", {
        email,
        password,
        name,
      });
      localStorage.setItem("sessionToken", response.data.token); // Store token in localStorage
      dispatch({
        type: "auth/loginSuccess",
        payload: {
          user: response.data.name,
          token: response.data.token,
          uid: response.data.uid,
        },
      });
      Swal.fire("Success", "Registration successful", "success");
      window.location.href = "/"; // Redirect to home page after successful registration
    } catch (error: any) {
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
      if (error.response?.data?.msg) {
        dispatch({
          type: "auth/logout",
          payload: { error: error.response.data.msg },
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

  const checkAuthToken = async () => {
    const token = localStorage.getItem("sessionToken");
    if (!token) {
      dispatch({ type: "auth/logout" }); // No token, log out
      return;
    }
    try {
      const response = await calendarApi.get("/auth/renew");
      localStorage.setItem("sessionToken", response.data.token);
      dispatch({
        type: "auth/loginSuccess",
        payload: {
          user: response.data.name,
          uid: response.data.uid,
          token: response.data.token,
        },
      });
    } catch (error: any) {
      console.error("Token renewal failed:", error);
      dispatch({ type: "auth/logout" });
    }
  };

  const logout = () => {
    dispatch({ type: "auth/logout" });
    dispatch({ type: "calendar/onLogoutCalendar" }); // Clear calendar state on logout
  };

  return {
    isAuthenticated,
    user,
    uid,
    status,
    errorMessage,
    // Methods
    startLogin,
    startRegister,
    checkAuthToken,
    logout,
  };
};
