import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./css/AddEmployee.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddInactiveEmployee() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    employee_name: "",
    employee_code: "",
    department: "",
    designation: "",
    role: "",
    gender: "",
    blood_group: "",
    n_id: "",
    contact_number: "",
    date_of_birth: "",
    date_of_joining: "",
    date_of_leaving: "",
    password: "",
    email: "",
    image: null,
  });

  const formData = new FormData();
  formData.append("employee_name", values.employee_name);
  formData.append("employee_code", values.employee_code);
  formData.append("department", values.department);
  formData.append("designation", values.designation);
  formData.append("role", values.role);
  formData.append("gender", values.gender);
  formData.append("blood_group", values.blood_group);
  formData.append("n_id", values.n_id);
  formData.append("contact_number", values.contact_number);
  formData.append("date_of_birth", values.date_of_birth);
  formData.append("date_of_joining", values.date_of_joining);
  formData.append("date_of_leaving", values.date_of_leaving);
  formData.append("password", values.password);
  formData.append("email", values.email);
  formData.append("image", values.image);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/inactiveEmployee", formData)
      .then((response) => {

        console.log(response);
        navigate("/inactiveEmployee");

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
        {/* <h5 className="main-title">Add Employee</h5> */}
        <div className="containerrr pt-20">
          <header>Add Inactive Employee</header>
          <form encType="multipart/form-data">
            <div className="form first">
              <div className="details personal">
                <div className="fields">
                  <div className="input-field">
                    <label>Employee Name:</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setValues({ ...values, employee_name: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Employee code:</label>
                    <input
                      type="number"
                      required
                      onChange={(e) => {
                        setValues({ ...values, employee_code: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Department:</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setValues({ ...values, department: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Designation:</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setValues({ ...values, designation: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Role:</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setValues({ ...values, role: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Gender:</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setValues({ ...values, gender: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Blood Group:</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setValues({ ...values, blood_group: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>NID:</label>
                    <input
                      type="number"
                      required
                      onChange={(e) => {
                        setValues({ ...values, n_id: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Contact_number:</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setValues({
                          ...values,
                          contact_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Date Of Birth:</label>
                    <input
                      type="date"
                      required
                      onChange={(e) => {
                        setValues({ ...values, date_of_birth: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Date Of Joining:</label>
                    <input
                      type="date"
                      required
                      onChange={(e) => {
                        setValues({
                          ...values,
                          date_of_joining: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Date Of Leaving:</label>
                    <input
                      type="date"
                      required
                      onChange={(e) => {
                        setValues({
                          ...values,
                          date_of_leaving: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Password:</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setValues({ ...values, password: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Email:</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Image:</label>
                    <input
                      type="file"
                      name="image"
                      required
                      onChange={(e) => {
                        setValues({ ...values, image: e.target.files[0] });
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

export default AddInactiveEmployee;
