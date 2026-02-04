import type { Event } from "react-big-calendar";
import type { User } from "./User.interface";
export interface ExtendedEvent extends Event {
  user?: User;
}
