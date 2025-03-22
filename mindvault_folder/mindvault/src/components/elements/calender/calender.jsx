import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card } from "react-bootstrap";
import "./cc.css";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Card className="p-3 calendar-container">
      <h5 className="text-center">Calendar</h5>
      <Calendar onChange={setDate} value={date} />
      <p className="text-center mt-2">
        Selected Date: <strong>{date.toDateString()}</strong>
      </p>
    </Card>
  );
};

export default CalendarComponent;
