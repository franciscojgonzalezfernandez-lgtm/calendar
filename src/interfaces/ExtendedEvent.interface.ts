import type { Event } from "react-big-calendar";
import type { User } from "./User.interface";
export interface ExtendedEvent extends Event {
  id?: number;
  user?: User;
  notes?: string;
}
