import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./css/InactiveEmployee.css";
import axios from "axios";

function InactiveEmployee() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/inactiveEmployee")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredData = data.filter((inactiveEmployee) => {
    return search.toLowerCase() === ""
      ? inactiveEmployee
      : inactiveEmployee.employee_name.toLowerCase().includes(search);
  });

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        {/* <h5 className="main-title">DASHBOARD</h5> */}
        <div className="btn">
        <Link to={"/addInactiveEmployee"}>
          <button>
            Add Employee
          </button>
        </Link>
        </div>
        <div className="inner_content">
          <div className="sub_content">
            <h5>
              <FaUser /> Inactive Employee List
            </h5>
            <hr />
            <div className="sub-header">
              {/* <div className="header-buttons">
                <button className="buttons">Copy</button>
                <button className="buttons">CSV</button>
                <button className="buttons">Excel</button>
                <button className="buttons">PDF</button>
                <button className="buttons">Print</button>
              </div> */}
              <div>
                <input
                  type="search"
                  className="search"
                  placeholder="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Employee Code</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>User type</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6">No records found</td>
                  </tr>
                ) : (
                  filteredData.map((employees, index) => (
                    <tr key={index} className="tbody">
                      <td>{employees.employee_name}</td>
                      <td>{employees.employee_code}</td>
                      <td>{employees.email}</td>
                      <td>{employees.contact_number}</td>
                      <td>{employees.role}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InactiveEmployee;
