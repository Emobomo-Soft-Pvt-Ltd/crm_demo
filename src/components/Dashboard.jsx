import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { FaBook, FaCalendar, FaUser,FaFolder, FaList, FaPeopleCarry, FaPeopleArrows, FaAppStore, FaDatabase, FaDashcube, FaTeamspeak, FaTags, FaSitemap, FaLandmark, FaProcedures } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { FaBook } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        {/* <div className="main-title"> */}
        {/* <h6 className="main-title">DASHBOARD</h6> */}
        {/* </div> */}
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h6>Team Today Follow Ups</h6>
              {/* <BsFillArchiveFill className='card_icon'/> */}
             
              <div className="circle-icon">
                <FaPeopleArrows />
              </div>
            </div>
            <h6>100</h6>
            {/* <span>New Leads in this month</span> */}
          </div>
          <div className="card">
            <div className="card-inner">
              
              <h6>Monthly Performance</h6>
              {/* <BsFillGrid3X3GapFill className='card_icon'/> */}
              <div className="circle-icon">
                <FaList />
              </div>
            </div>
            <h6>167</h6>
            {/* <span>Active Leads in this month</span> */}
          </div>
          <div className="card">
            <div className="card-inner">
              <h6>Total Data</h6>
              {/* <BsPeopleFill className='card_icon'/> */}
              <div className="circle-icon">
                <FaDatabase />
              </div>
              
            </div>
            <h6>65</h6>
            {/* <span>Not Active Leads in this month</span> */}
          </div>
          <div className="card">
            <div className="card-inner">
              <h6>Unassigned Data</h6>
              {/* <BsFillBellFill className='card_icon'/> */}
              <div className="circle-icon">
                <FaDashcube />
              </div>
            </div>
            <h6>05</h6>
            {/* <span>Not Active Leads in this month</span> */}
          </div>
          <div className="card">
            <div className="card-inner">
              <h6>Team Wise Performance</h6>
              {/* <BsFillBellFill className='card_icon'/> */}
              <div className="circle-icon">
                <FaTags />
              </div>
            </div>
            <h6>100</h6>
            {/* <span>Not Active Leads in this month</span> */}
          </div>
          <div className="card">
            <div className="card-inner">
              <h6>Hot Prospects</h6>
              {/* <BsFillBellFill className='card_icon'/> */}
              <div className="circle-icon">
                <FaPeopleCarry />
              </div>
            </div>
            <h6>15</h6>
            {/* <span>Not Active Leads in this month</span> */}
          </div>
          <div className="card">
            <div className="card-inner">
              <h6> Monthly Site Visits</h6>
              {/* <BsFillBellFill className='card_icon'/> */}
              <div className="circle-icon">
                <FaSitemap />
              </div>
            </div>
            <h6>25</h6>
            {/* <span>Not Active Leads in this month</span> */}
          </div>
          <div className="card">
            <div className="card-inner">
              <h6>Projected Projects</h6>
              {/* <BsFillBellFill className='card_icon'/> */}
              <div className="circle-icon">
                <FaFolder />
              </div>
            </div>
            <h6>23</h6>
            {/* <span>Not Active Leads in this month</span> */}
          </div>
          <div className="card">
            <div className="card-inner">
              <h6>Upcoming Site Visits</h6>
              {/* <BsFillBellFill className='card_icon'/> */}
              <div className="circle-icon">
                <FaLandmark />
              </div>
            </div>
            <h6>10</h6>
            {/* <span>Not Active Leads in this month</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
