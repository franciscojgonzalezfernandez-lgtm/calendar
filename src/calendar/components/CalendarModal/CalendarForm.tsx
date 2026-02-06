import { addHours } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { ExtendedEvent } from "../../../interfaces/ExtendedEvent.interface";

export const CalendarForm = () => {
  const [formValues, setFormValues] = useState<ExtendedEvent>({
    start: new Date(),
    end: addHours(new Date(), 2),
    title: "New event",
    notes: "event notes",
  });

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setFormValues({ ...formValues, [target.name]: target.value });
    console.log({ change: event });
  };
  return (
    <>
      <h1>New Event</h1>
      <hr />
      <form className="container">
        <div className="form-group mb-2">
          <label>Start date and time</label>
          <input className="form-control" placeholder="Start date" />
        </div>

        <div className="form-group mb-2">
          <label>End date and time</label>
          <input className="form-control" placeholder="End date" />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Title and notes</label>
          <input
            type="text"
            className="form-control"
            placeholder="Event title"
            name="title"
            value={formValues.title}
            onChange={onInputChanged}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            A short description
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notes"
            rows={5}
            name="notes"
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Additional information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span>Save</span>
        </button>
      </form>
    </>
  );
};
