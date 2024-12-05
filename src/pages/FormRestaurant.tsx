import React, { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Layouts/Navbar";
import { FormData, OperatingHours } from "../interfaces/interface";
import saveRestaurant from "../services/saveRestaurant";
import { Link, useNavigate } from "react-router-dom";
import { IsAuthorize } from "../hooks/isAuthorize";

const FormRestaurant = () => {
  const [formData, setFormData] = useState<FormData>({
    restaurantName: "",
    mondayOpening: "",
    mondayClosing: "",
    tuesdayOpening: "",
    tuesdayClosing: "",
    wednesdayOpening: "",
    wednesdayClosing: "",
    thursdayOpening: "",
    thursdayClosing: "",
    fridayOpening: "",
    fridayClosing: "",
    saturdayOpening: "",
    saturdayClosing: "",
    sundayOpening: "",
    sundayClosing: "",
  });

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const navigate = useNavigate();
  const checkRoles = IsAuthorize();

  if (!checkRoles) {
    navigate("/forbidden");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const operating_hours: OperatingHours = {};

    daysOfWeek.forEach((day) => {
      const opening = formData[`${day}Opening` as keyof FormData];
      const closing = formData[`${day}Closing` as keyof FormData];

      if (opening && closing) {
        operating_hours[capitalizeFirstLetter(day)] = `${opening} - ${closing}`;
      }
    });

    const payload = {
      roles: sessionStorage.getItem("roles"),
      name: formData.restaurantName,
      operating_hours,
    };

    console.log(payload)

    const response = await saveRestaurant(payload);

    console.log(response)

    if (response.data.response_code === 200) {
      sessionStorage.setItem("notification", "Create Restaurant Successfully");
      navigate("/");
    } else {
      Swal.fire({
        title: "Failed",
        text: "Failed to create restaurant.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const capitalizeFirstLetter = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div className="px-3">
      <Navbar />
      <div className="col-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Restaurant Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Restaurant Name"
              name="restaurantName"
              onChange={handleChange}
            />
          </div>
          <div className="row mt-3">
            <label>Operation Time</label>
            {daysOfWeek.map((day) => (
              <div key={day} className="col-4 mt-2">
                <label htmlFor="">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
                <div className="row">
                  <div className="col-6">
                    <label>Opening Time</label>
                    <input
                      type="time"
                      className="form-control"
                      placeholder="Opening Time"
                      name={`${day}Opening`}
                      value={formData[`${day}Opening` as keyof typeof formData]}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <label>Closing Time</label>
                    <input
                      type="time"
                      className="form-control"
                      placeholder="Closing Time"
                      name={`${day}Closing`}
                      value={formData[`${day}Closing` as keyof typeof formData]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary btn-sm rounded mt-3">
            Submit
          </button>
          <Link
            to={"/"}
            style={{ marginLeft: "10px" }}
            className="btn btn-warning btn-sm rounded mt-3 text-white"
          >
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default FormRestaurant;
