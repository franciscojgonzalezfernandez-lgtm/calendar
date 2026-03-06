import axios from "axios";

const calendarApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// TODO - Interceptor to attach auth token if needed, similar to teslaApi. For now, calendarApi is a simple axios instance with the base URL set.

calendarApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("sessionToken");
  if (token) {
    config.headers = {
      ...config.headers,
      "x-token": `${token}`,
    };
  }
  return config;
});

export default calendarApi;
