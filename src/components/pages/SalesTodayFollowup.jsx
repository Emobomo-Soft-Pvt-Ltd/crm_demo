import React, { useEffect, useState } from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./css/AssignData.css";
import axios from "axios";
import { useAuth } from "../AuthContext";

function SalesTodayFollowup() {
  const { user } = useAuth();
  const usertype = user ? user.role : "";
  const sales_person = user ? user.employee_name : "";

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // FETCHING DATA BASED ON ROLE IF ADMIN DISPLAY ALL DETAILS
  // OR WITH PARTICULAR SALESPERSON NAME

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (usertype === "Sales Manager") {
          // If admin, fetch all data
          response = await axios.get(`http://localhost:8081/callLogs`);
        } else {
          // If not admin, fetch data for a specific user by ID
          response = await axios.get(
            `http://localhost:8081/callLogs/${sales_person}`
          );
        }

        const formattedData = response.data.map((lead) => ({
          log_id: lead.log_id,
          date:
            lead.date && lead.date !== "0000-00-00"
              ? new Date(lead.date).toLocaleDateString("en-CA")
              : "",
          lead_name: lead.lead_name,
          lead_status: lead.lead_status,
          follow_up_date:
            lead.follow_up_date && lead.follow_up_date !== "0000-00-00"
              ? new Date(lead.follow_up_date).toLocaleDateString("en-CA")
              : "",
          note: lead.note,
          sales_person_name: lead.sales_person_name,
        }));

        // Sort the data by log_id in descending order
        const sortedData = formattedData.sort((a, b) => b.log_id - a.log_id);
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };  

    fetchData();
  }, [usertype, sales_person]);
  //-----------END---------------

  // FILTERING DATA BASED ON TODAY FOLLOW UP DATE
  const today = new Date().toLocaleDateString("en-CA");
  const filteredData = data.filter((lead) => {
    return (
      (search.toLowerCase() === "" ||
        lead.lead_name.toLowerCase().includes(search.toLowerCase())) &&
      lead.follow_up_date === today &&
      lead.follow_up_date !== "1899-11-30"
    );
  });
  //-----------END--------------------

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        {/* <h5 className="main-title">Team Followup</h5> */}
        <div className="btns">
          <Link to={"/addLeads"}>
            <button>
              <FaPlus /> Add Lead
            </button>
          </Link>
          <Link to={"/bulkDataImport"}>
            <button>
              <FaPlus /> Bulk Data Import
            </button>
          </Link>
        </div>
        <div className="inner_content">
          <div className="sub_content">
            <h5>
              <FaUser />
              Today FollowUp List
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
                  <th>Date</th>
                  <th>Lead Name</th>
                  <th>Lead Status</th>
                  <th>Follow Up Date</th>
                  <th>Note</th>
                  {/* <th>Sales Person</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6">No FollowUp Today</td>
                  </tr>
                ) : (
                  filteredData.map((lead, index) => (
                    <tr key={index} className="tbody">
                      <td>{lead.date}</td>
                      <td>
                        <Link to={`/searchLead/${lead.log_id}`}>
                          {lead.lead_name}
                        </Link>
                      </td>
                      <td>{lead.lead_status}</td>
                      <td>
                        {lead.follow_up_date === "1899-11-30"
                          ? "N/A"
                          : lead.follow_up_date || "N/A"}
                      </td>
                      <td>{lead.note}</td>
                      {/* <td>{lead.sales_person_name}</td> */}
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

export default SalesTodayFollowup;
