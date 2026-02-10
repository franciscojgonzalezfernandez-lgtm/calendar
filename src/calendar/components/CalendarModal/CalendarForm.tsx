import { addHours, differenceInSeconds } from "date-fns";
import React, { useMemo, useState, type FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { ExtendedEvent } from "../../../interfaces/ExtendedEvent.interface";
import Swal from "sweetalert2";

export const CalendarForm = () => {
  const [formValues, setFormValues] = useState<ExtendedEvent>({
    start: new Date(),
    end: addHours(new Date(), 2),
    title: "New event",
    notes: "event notes",
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const titleClass = useMemo(() => {
    if (isSubmitted && !formValues.title) {
      return "is-invalid";
    }
    return "";
  }, [isSubmitted]);

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setFormValues({ ...formValues, [target.name]: target.value });
    console.log({ change: event });
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    const formData = new FormData(event.currentTarget);

    if (!formValues.start || !formValues.end) {
      Swal.fire("Both dates should be defined", "", "error");
      return;
    }
    const dateDiff = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(dateDiff) || dateDiff <= 0) {
      console.error("Fail in dates");
      Swal.fire("End date should be after the start date", "", "error");
      return;
    }
    if (!formValues.title) {
      console.log(formData.get("title"));
      formData.get("title");
      return;
    }
    console.log({ event });
  };
  return (
    <>
      <h1>New Event</h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Start date and time</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(date: Date | null) => {
              setFormValues({ ...formValues, start: date || undefined });
            }}
            dateFormat="dd/MM/yyyy HH:mm"
            showTimeSelect
          />
        </div>

        <div className="form-group mb-2">
          <label>End date and time</label>
          <DatePicker
            selected={formValues.end}
            onChange={(date: Date | null) => {
              setFormValues({ ...formValues, end: date || undefined });
            }}
            className="form-control"
            dateFormat="dd/MM/yyyy HH:mm"
            minDate={formValues.start}
            minTime={formValues.start}
            maxTime={new Date().setHours(23, 59, 0, 0)}
            showTimeSelect
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Title and notes</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
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
