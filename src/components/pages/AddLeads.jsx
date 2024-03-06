import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./css/AddLeads.css";
import axios from "axios";
import { useAuth } from "../AuthContext";

function AddLeads() {
  const { user } = useAuth();
  const sales_person = user ? user.employee_name : "";

  // Function to format today's date as "YYYY-MM-DD"
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [values, setValues] = useState({
    lead_name: "",
    address: "",
    email: "",
    sales_person_name: sales_person,
    date: new Date().toISOString().split("T")[0],
    lead_status: "",
    follow_up_date: "",
    lead_source: "",
    note: "",
  });

  // POSTING LEAD WITH CALLLOG IF LEAD NOT PRESENT
  const handleSubmitClick = (e) => {
    e.preventDefault();

    setValues({
      ...values,
      date: new Date().toISOString().split("T")[0],
    });

    axios
      .post("http://localhost:8081/leads", {
        lead_name: values.lead_name,
        address: values.address,
        email: values.email,
        sales_person_name: values.sales_person_name,
        date: values.date,
        lead_status: values.lead_status,
        follow_up_date: values.follow_up_date,
        lead_source: values.lead_source,
        note: values.note,
      })
      .then((response) => {
        alert("Lead added Successfully");
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //END-----------------

  //DROPDOWN DATA FOR LEAD SOURCE
  const lead_source = ["Linkedin", "Website", "vendor"];

  //DROPDOWN DATA FOR LEAD STATUS
  const lead_status = ["Intrested", "Not Intrested", "Not Answered"];

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        {/* <h5 className="main-title">Add Leads</h5> */}
        {/* <Link to={"/assignData"}>
          <button>
            <FaBars /> Data List
          </button>
        </Link> */}
        <div className="containerr pt-20">
          <header>Add Leads</header>
          <form onSubmit={handleSubmitClick}>
            <div className="form first">
              <div className="details personal">
                <div className="fields">
                  <div className="input-field">
                    <label>Lead Name:</label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      required
                      onChange={(e) => {
                        const leadName = e.target.value;
                        setValues({ ...values, lead_name: leadName });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Location:</label>
                    <input
                      type="text"
                      placeholder="Enter Address"
                      required
                      onChange={(e) => {
                        setValues({
                          ...values,
                          address: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Email Id:</label>
                    <input
                      type="text"
                      placeholder="Enter EmailId"
                      required
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Today Date:</label>
                    <input type="date" value={getTodayDate()} readOnly />
                  </div>
                  <div className="input-field">
                    <label>Lead Status:</label>
                    <select
                      onChange={(e) => {
                        setValues({
                          ...values,
                          lead_status: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled>
                        Select lead status
                      </option>
                      {lead_status.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-field">
                    <label>Follow Up Date:</label>
                    <input
                      type="date"
                      required
                      onChange={(e) => {
                        setValues({
                          ...values,
                          follow_up_date:
                            e.target.value !== "" ? e.target.value : null,
                        });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Sales Person:</label>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={user.employee_name}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          sales_person_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Category:</label>
                    <input
                      type="text"
                      placeholder="eg:Manufacture"
                      required
                      onChange={(e) => {
                        setValues({ ...values, note: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-field">
                    <label>Lead Source:</label>
                    <select
                      value={values.role}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          lead_source: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled >
                        Select lead source
                      </option>
                      {lead_source.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-field">
                    <label>Note:</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setValues({ ...values, note: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button className="submit">Add Lead</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLeads;
