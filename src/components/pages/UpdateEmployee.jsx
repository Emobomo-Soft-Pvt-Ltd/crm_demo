import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./css/UpdateData.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateEmployee() {
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/employees/${id}`)
      .then((res) => {
        console.log(res);
        setValues({
          employee_name: res.data[0].employee_name,
          employee_code: res.data[0].employee_code,
          department: res.data[0].department,
          designation: res.data[0].designation,
          role: res.data[0].role,
          gender: res.data[0].gender,
          blood_group: res.data[0].blood_group,
          n_id: res.data[0].n_id,
          contact_number: res.data[0].contact_number,
          date_of_birth: new Date(res.data[0].date_of_birth).toLocaleDateString(
            "en-CA"
          ),
          date_of_joining: new Date(
            res.data[0].date_of_joining
          ).toLocaleDateString("en-CA"),
          date_of_leaving: new Date(
            res.data[0].date_of_leaving
          ).toLocaleDateString("en-CA"),
          password: res.data[0].password,
          email: res.data[0].email,
          image: res.data[0].image,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

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
  // formData.append("employee_code", values.employee_code);
  // formData.append("department", values.department);
  formData.append("designation", values.designation);
  // formData.append("role", values.role);
  formData.append("gender", values.gender);
  formData.append("blood_group", values.blood_group);
  // formData.append("n_id", values.n_id);
  formData.append("contact_number", values.contact_number);
  formData.append("date_of_birth", values.date_of_birth);
  formData.append("date_of_joining", values.date_of_joining);
  // formData.append("date_of_leaving", values.date_of_leaving);
  formData.append("password", values.password);
  formData.append("email", values.email);
  formData.append("image", values.image);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/employees/${id}`, formData)
      .then((response) => {
        alert("Employee Updated Successfully");
        console.log(response);
        navigate("/employees");
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
          <form className="forms" encType="multipart/form-data">
            <div className="form first">
              <div className="details personal">
                <div className="fields">
                  <div className="input-field">
                    <label>User Name:</label>
                    <input
                      type="text"
                      // placeholder="Enter Name"
                      value={values.employee_name}
                      required
                      onChange={(e) => {
                        setValues({ ...values, employee_name: e.target.value });
                      }}
                    />
                  </div>
                  {/* <div className="input-field">
                    <label>Employee code:</label>
                    <input
                      type="number" placeholder="Enter Code"
                      required
                      onChange={(e) => {
                        setValues({ ...values, employee_code: e.target.value });
                      }}
                    />
                  </div> */}

                  <div className="input-field">
                    <label>Designation:</label>
                    <input
                      type="text"
                      value={values.designation}
                      // placeholder="Enter Email"
                      required
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                      }}
                    />
                  </div>

                  <div className="input-field">
                    <label>Gender:</label>
                    <input
                      type="text"
                      value={values.gender}
                      // placeholder="Enter Email"
                      required
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                      }}
                    />
                  </div>

                  <div className="input-field">
                    <label>Contact number:</label>
                    <input
                      type="tel"
                      // placeholder="+8456789546"
                      value={values.contact_number}
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
                    <label>Email:</label>
                    <input
                      type="text"
                      // placeholder="Enter Email"
                      value={values.email}
                      required
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>BloodGroup:</label>
                    <input
                      type="text"
                      // placeholder="Enter Email"
                      value={values.blood_group}
                      required
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                      }}
                    />
                  </div>

                  <div className="input-field">
                    <label>Date Of Birth:</label>
                    <input
                      type="date"
                      value={values.date_of_birth}
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
                      value={values.date_of_joining}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          date_of_joining: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Password:</label>
                    <input
                      type="text"
                      // placeholder="Enter Password"
                      value={values.password}
                      required
                      onChange={(e) => {
                        setValues({ ...values, password: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Image:</label>
                    <input
                      type="file"
                      name="image"
                      // value={values.image}
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
                  <span className="submit">Update</span>
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

export default UpdateEmployee;
