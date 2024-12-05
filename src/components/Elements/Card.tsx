import React from "react";
import { CardProps } from "../../interfaces/interface";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Card: React.FC<CardProps> = ({ name, operating_hours }) => {
  return (
    <>
      <div className="col-4 mb-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Operating Hours:</h6>
            <ul>
              {daysOfWeek.map((day) => {
                const hour = operating_hours.find((oh) => oh.day === day);
                return (
                  <li key={day}>
                    {day}:{" "}
                    {hour
                      ? `${hour.opening_time} - ${hour.closing_time}`
                      : <b>Closed</b>}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
