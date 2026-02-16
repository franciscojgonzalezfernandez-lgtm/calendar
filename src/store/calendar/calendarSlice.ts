import { createSlice } from "@reduxjs/toolkit";
import type { ExtendedEvent } from "../../interfaces/ExtendedEvent.interface";
import { addHours } from "date-fns";

const tempEvent: ExtendedEvent = {
  _id: new Date().getTime(),
  title: "Javi's Birthday",
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    id: "123",
    name: "Javier",
  },
};

export const calendarSlice = createSlice({
  name: "ui",
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onCreateEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
  },
});

export const { onSetActiveEvent, onCreateEvent } = calendarSlice.actions;
