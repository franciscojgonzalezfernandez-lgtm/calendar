import axios from "axios";

const calendarApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default calendarApi;

// TODO - Interceptor to attach auth token if needed, similar to teslaApi. For now, calendarApi is a simple axios instance with the base URL set.
