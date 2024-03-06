import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
// import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import AddNoticeForm from "./AddNoticeForm";
import "./css/Employees.css";
import axios from "axios";

function Notice() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddNoticeFormOpen, setIsAddNoticeFormOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/notice")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //FILTERING DATA
  const filteredData = data.filter((notice) => {
    return search.toLowerCase() === ""
      ? notice
      : notice.title.toLowerCase().includes(search);
  });

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        <h5 className="main-title">Notice Board</h5>
        <button onClick={() => setIsAddNoticeFormOpen(true)}>
          <FaPlus /> Add Notice
        </button>
        {isAddNoticeFormOpen && (
          <AddNoticeForm
            onClose={() => setIsAddNoticeFormOpen(false)}
            onSave={(noticeData) => {
              // Handle saving notice data (e.g., send a request to the server)
              console.log("Notice data:", noticeData);
            }}
          />
        )}
        <div className="inner_content">
          <div className="sub_content">
            <h5>Notice</h5>
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
                  <th>Title</th>
                  <th>File</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6">No records found</td>
                  </tr>
                ) : (
                  filteredData.map((notice, index) => (
                    <tr key={index} className="tbody">
                      <td>{notice.title}</td>
                      <td>{notice.file}</td>
                      <td>{notice.date}</td>
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

export default Notice;
