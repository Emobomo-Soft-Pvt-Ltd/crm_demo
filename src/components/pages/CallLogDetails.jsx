import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./css/AddLeads.css";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

function CallLogDetails() {
  const { user } = useAuth();
  const usertype = user ? user.designation : "";
  const sales_person = user ? user.employee_name : "";

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredData = data.filter((lead) => {
    return (
      search.toLowerCase() === "" ||
      lead.lead_name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const [callLogValues, setCallLogValues] = useState({
    date: new Date().toISOString().split("T")[0],
    lead_name: "",
    lead_status: "",
    follow_up_date: "",
    note: "",
  });
  const [showInputFields, setShowInputFields] = useState(false);

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
          sales_person_name : lead.sales_person_name,
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
  //-----------END-------

  //TO OPEN INPUT FIELDS IN TABLE WHEN WE CLICK ON ADD ICON
  const toggleInputFields = () => {
    setShowInputFields(!showInputFields);
  };

  const handleAddLeadClick = () => {
    setValues({
      ...values,
      date: new Date().toISOString().split("T")[0],
    });
    toggleInputFields();
  };
  //-----------END------------------

  //POSTING/INSERTING CALLLOG DETAILS
  const handleSubmit = (e) => {
    e.preventDefault();

    setCallLogValues({
      ...callLogValues,
      date: new Date().toISOString().split("T")[0],
    });

    axios
      .post("http://localhost:8081/calllog", {
        date: callLogValues.date,
        lead_name: callLogValues.lead_name,
        lead_status: callLogValues.lead_status,
        follow_up_date: callLogValues.follow_up_date,
        note: callLogValues.note,
      })
      .then((response) => {
        alert(" added Successfully");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Lead not found");
      });
  };

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
        <form action="">
          <div className="buttons">
            <Link to={"/addLeads"}>
              <button className="submit">Add Lead</button>
            </Link>
          </div>
        </form>
        <div className="containerrr pt-20">
          <div className="contact_details">
            <div className="contact_details_header">
              <header>Call Log Details</header>
              <div className="buttons">
                <FaPlus onClick={handleAddLeadClick} />
                <input
                  type="search"
                  className="search"
                  placeholder="Search By Lead Name"
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
                  <th>Follow up date</th>
                  <th>Note</th>
                  <th>Sales Person</th>
                </tr>
              </thead>
              <tbody>
                {showInputFields && (
                  <tr>
                    <td>
                      <input type="date" value={getTodayDate()} readOnly />
                    </td>
                    <td>
                      <input
                        type="text"
                        required
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setCallLogValues({
                            ...callLogValues,
                            lead_name: e.target.value,
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        required
                        onChange={(e) => {
                          setCallLogValues({
                            ...callLogValues,
                            lead_status: e.target.value,
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        required
                        onChange={(e) => {
                          setCallLogValues({
                            ...callLogValues,
                            follow_up_date:
                              e.target.value !== "" ? e.target.value : null,
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        required
                        onChange={(e) => {
                          setCallLogValues({
                            ...callLogValues,
                            note: e.target.value,
                          });
                        }}
                      />
                    </td>
                    <td>
                      <button onClick={handleSubmit}>submit</button>
                    </td>
                  </tr>
                )}

                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="5">No records found Add Lead</td>
                  </tr>
                ) : (
                  filteredData.map((lead, index) => (
                    <tr key={index} className="tbody">
                      <td>{lead.date || "N/A"}</td>
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
                      <td>{lead.sales_person_name}</td>
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

export default CallLogDetails;
