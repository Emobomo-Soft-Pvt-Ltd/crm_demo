import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./css/UpdateData.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateLeads() {
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/leads/${id}`)
      .then((res) => {
        console.log(res);
        setValues({
          name: res.data[0].name,
          contact_number: res.data[0].contact_number,
          location: res.data[0].location,
          interested_for: res.data[0].interested_for,
          email: res.data[0].email,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const [values, setValues] = useState({
    name: "",
    contact_number: "",
    location: "",
    interested_for: "",
    email: "",
   
  });

  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("contact_number", values.contact_number);
  formData.append("location", values.location);
  formData.append("interested_for", values.interested_for);
  formData.append("email", values.email);
  

  const handleSubmitClick = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/leads/${id}`, formData)
      .then((response) => {
        console.log(response);
        navigate("/assignData");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        {/* <h5 className="main-title">DASHBOARD</h5> */}
        <div className="containerrr pt-20">
          <header>Edit Employee</header>
          <form encType="multipart/form-data">
            <div className="form first">
              <div className="details personal">
                <div className="fields">
                  <div className="input-field">
                    <label>Name:</label>
                    <input
                      type="text"
                      value={values.name}
                      required
                      onChange={(e) => {
                        setValues({ ...values, name: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Contact Number:</label>
                    <input
                      type="tel"
                      value={values.contact_number}
                      required
                      onChange={(e) => {
                        setValues({ ...values, contact_number: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Location:</label>
                    <input
                      type="text"
                      value={values.location}
                      required
                      onChange={(e) => {
                        setValues({ ...values, location: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Intrested for:</label>
                    <input
                      type="text"
                      value={values.interested_for}
                      required
                      onChange={(e) => {
                        setValues({ ...values, interested_for: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Email:</label>
                    <input
                      type="text"
                      value={values.email}
                      required
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button onClick={handleSubmitClick} className="submit">
                  <span className="submit">Create</span>
                  {/* <i className="uil uil-navigator"></i> */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateLeads;
