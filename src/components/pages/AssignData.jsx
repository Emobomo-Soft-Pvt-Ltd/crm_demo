import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./css/AssignData.css";
import axios from "axios";

function AssignData() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/leads")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //FILTERING DATA
  const filteredData = data.filter((leads) => {
    return search.toLowerCase() === ""
      ? leads
      : leads.name.toLowerCase().includes(search);
  });

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        {/* <h5 className="main-title">Add Lead</h5> */}
        <div className="btns"> 
        <Link to={"/addLeads"}>
          <button>
            <FaPlus /> Add Lead
          </button>
        </Link>
        <Link to={"/addLeads"}>
          <button>
            <FaPlus /> Bulk Data Import
          </button>
        </Link>
        </div>
        <div className="inner_content">
          <div className="sub_content">
            <h5>
              <FaUser />
              Leads List
            </h5>
            <hr />
            <div className="sub-header">
              <div className="header-buttons">
                <button className="buttons">Copy</button>
                <button className="buttons">CSV</button>
                <button className="buttons">Excel</button>
                <button className="buttons">PDF</button>
                <button className="buttons">Print</button>
              </div>
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
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Intrested for</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6">No records found</td>
                  </tr>
                ) : (
                  filteredData.map((leads, index) => (
                    <tr key={index} className="tbody">
                      <td>{leads.id}</td>
                      <td>{leads.name}</td>
                      <td>{leads.contact_number}</td>
                      <td>{leads.location}</td>
                      <td>{leads.interested_for}</td>
                      <td>{leads.email}</td>
                      <td>
                        <Link to={`/updateLeads/${leads.id}`}>
                          <FaEdit />
                        </Link>
                        <Link to={`//${leads.id}`}>
                          <FaTrash />
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

export default AssignData;
