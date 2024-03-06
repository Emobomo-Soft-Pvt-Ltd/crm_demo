import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./css/Employees.css";
import axios from "axios";

function Employees() {
  const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/user")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //FILTERING DATA
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
        {/* <h5 className="main-title">Employee</h5> */}
        <Link to={"/addEmployee"}>
          <button>
            <FaPlus /> Add User
          </button>
        </Link>
        <div className="inner_content">
          <div className="sub_content">
            <h5><FaUser />User List</h5>
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
                  <th>User Name</th>
                  <th>Designation</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                   {/* <td colSpan="6">No records found</td> */}
                    <td>pooja</td>
                    <td>Sales Manager</td>
                    <td>pooja@emobomo.com</td>
                    <td>8562456332</td>
                  </tr>
                ) : (
                  filteredData.map((employees, index) => (
                    <tr key={index} className="tbody">
                      <td>{employees.employee_name}</td>
                      <td>{employees.designation}</td>
                      <td>{employees.email}</td>
                      <td>{employees.contact_number}</td>
                      
                      <td>
                          <Link to={`/updateEmployee/${employees.id}`}>
                            <FaEdit />
                          </Link>
                        </td>
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

export default Employees;
