import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
// import axios from "axios";
import {
  FaCog,
  FaComment,
  FaDatabase,
  FaTachometerAlt,
  FaUser,
  FaPen,
  FaFolder,
  FaLink,
  FaInbox,
} from "react-icons/fa";
import { useAuth } from "./AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(
    window.innerWidth >= 300 && window.innerWidth <= 600
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 300 && window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
    /* uncomment at the time of connecting database */
 
  // const usertype = user ? user.designation : "";
  const usertype = user ? user.name : "";
  // const todayFollowupLink =
  //   usertype === "Sales Manager" ? "/teamFollows" : "/salesTodayFollowup";

  // const leadLink =
  //   usertype === "Sales Manager" ? "/callLogDetails" : "/salesLeads";

  // const [logoImage, setLogoImage] = useState(null);
  // useEffect(() => {
  //   const fetchInitialLogo = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8081/logo");
  //       console.log("Logo Data:", response.data); // Log the received data
  //       setLogoImage(response.data.logo_image);
  //     } catch (err) {
  //       console.error("Axios Error:", err);
  //     }
  //   };

  //   // Fetch the initial logo only after the component has mounted
  //   fetchInitialLogo();
  // }, []);
  // const [dropdownOpen, setDropdownOpen] = useState({
  //   1: false,
  //   2: false,
  //   3: false,
  // });

  // const toggleDropdown = (dropdownNumber) => {
  //   setDropdownOpen((prevOpen) => ({
  //     ...Object.fromEntries(
  //       Object.entries(prevOpen).map(([key]) => [key, false])
  //     ),
  //     [dropdownNumber]: !prevOpen[dropdownNumber],
  //   }));
  // };

  return (
    <div className="sidebar">
      {/* uncomment at the time of connecting database */}
      {/* <h2 className="logo">{user ? user.employee_name : ""}</h2> */}
      <h2 className="logo">{user ? user.name : ""}</h2>

      {/* <div className="brand">
        {logoImage && (
          <img
            src={`http://localhost:8081/logos/${logoImage}`}
            alt="Logo"
            className="logo"
          />
        )}
        {console.log(logoImage)}
      </div> */}
      <ul className="nav">
        <li>
          <NavLink to="/dashboard" activeclassname="active">
            {/* <FaTachometerAlt /> Dashboard */}
            {isMobile ? (
              <FaTachometerAlt />
            ) : (
              <>{<FaTachometerAlt />} Dashboard</>
            )}
          </NavLink>
        </li>
        {/* <li className={dropdownOpen[1] ? "dropdown open" : "dropdown"}>
          <div className="dropdown-toggle" onClick={() => toggleDropdown(1)}>
            <span>Organisation</span>
            <i
              style={{
                transform: dropdownOpen[1] ? "rotate(180deg)" : "rotate(0deg)",
              }}
              className="fa fa-angle-down"
            ></i>
          </div>
          <ul className="dropdown-menu">
            <li>
              <Link to="/department">Department</Link>
            </li>
            <li>
              <Link to="/designation">Designation</Link>
            </li>
          </ul>
        </li> */}
        {/* uncomment at the time of connecting database */}
        {/* {usertype === "Sales Manager" && ( */}
        {usertype === "Admin" && (
          <li>
            <NavLink to="/employees" activeclassname="active">
            {isMobile ? (
              <FaUser />
            ) : (
              <>{  <FaUser /> } Users</>
            )}
            </NavLink>
          
            {/* {isMobile ? (
              <FaUser />
            ) : (
              <>{  <FaUser /> } Users</>
            )} */}
          </li>

          // <li className={dropdownOpen[2] ? "dropdown open" : "dropdown"}>
          //   <div className="dropdown-toggle" onClick={() => toggleDropdown(2)}>
          //     <span>
          //       <FaUser /> User
          //     </span>
          //     <i
          //       style={{
          //         transform: dropdownOpen[2]
          //           ? "rotate(180deg)"
          //           : "rotate(0deg)",
          //       }}
          //       className="fa fa-angle-down"
          //     ></i>
          //   </div>
          //   <ul className="dropdown-menu">
          //     <li>
          //       <Link to="/employees">Active Users</Link>
          //     </li>
          //     <li>
          //       <Link to="/inactiveEmployee">Inactive User</Link>
          //     </li>
          //   </ul>
          // </li>
        )}
        <li>
          <NavLink to="/projects" activeclassname="active">
           {isMobile ? (
               <FaFolder />
            ) : (
              <>{ <FaFolder />} Projects</>
            )}
          </NavLink>
          {/* <FaFolder /> Projects */}
          {/* {isMobile ? (
               <FaFolder />
            ) : (
              <>{ <FaFolder />} Projects</>
            )} */}
        </li>

        {/* <li>
          <NavLink to="/attendance" activeclassname="active">
         <FaPen /> Attendance
          </NavLink>
          <FaPen /> Attendance
        </li> */}
        {/* Conditionally render based on user type */}
        {usertype === "Admin" && (
          <li>
            <NavLink to=" " activeclassname="active">
               {isMobile ? (
              <FaPen />
            ) : (
              <>{ <FaPen />} Attendance</>
            )}
            </NavLink>
            {/* <FaPen /> Attendance */}
            {/* {isMobile ? (
              <FaPen />
            ) : (
              <>{ <FaPen />} Attendance</>
            )} */}
          </li>
        )}

        {usertype === "User1" && (
          <li>
            <NavLink to=" " activeclassname="active">
              {isMobile ? (
              <FaPen />
            ) : (
              <>{ <FaPen />}My Attendance</>
            )}
            </NavLink>
             {/* <FaPen /> Attendance */}
            {/* {isMobile ? (
              <FaPen />
            ) : (
              <>{ <FaPen />}My Attendance</>
            )} */}
          </li>
        )}

        {/* <li className={dropdownOpen[4] ? "dropdown open" : "dropdown"}>
          <div className="dropdown-toggle" onClick={() => toggleDropdown(4)}>
            <NavLink to="/projects" activeclassname="active">
              Projects
            </NavLink>
            <i
              style={{
                transform: dropdownOpen[4] ? "rotate(180deg)" : "rotate(0deg)",
              }}
              className="fa fa-angle-down"
            ></i>
          </div>
          <ul className="dropdown-menu">
            <li>
              <NavLink to="/project1" activeclassname="active">
                Sub Option 1
              </NavLink>
            </li>
            <li>
              <NavLink to="/project1" activeclassname="active">
                Sub Option 2
              </NavLink>
            </li>
            <li>
              <NavLink to="/project1" activeclassname="active">
                Sub Option 3
              </NavLink>
            </li>
            <li>
              <NavLink to="/project1" activeclassname="active">
                Sub Option 4
              </NavLink>
            </li>
            <li>
              <NavLink to="/project1" activeclassname="active">
                Sub Option 5
              </NavLink>
            </li>
          </ul>
        </li> */}

        {/* <li className={dropdownOpen[3] ? "dropdown open" : "dropdown"}>
          <div className="dropdown-toggle" onClick={() => toggleDropdown(3)}>
            <span>
              <FaDatabase /> Leads Management
            </span>
            <i
              style={{
                transform: dropdownOpen[3] ? "rotate(180deg)" : "rotate(0deg)",
              }}
              className="fa fa-angle-down"
            ></i>
          </div>
          <ul className="dropdown-menu">
            <li>
              <NavLink
                to="/bulkDataImport"
                activeclassname="active"
                onMouseDown={(e) => e.preventDefault()}
              >
                Bulk Data Import
              </NavLink>
            </li>
            <li>
              <NavLink
                to={leadLink}
                activeclassname="active"
                onMouseDown={(e) => e.preventDefault()}
              >
                Add Leads
              </NavLink>
            </li>
            <li>
              <Link to="/assignData">Assign Data</Link>
            </li>
          </ul>
        </li> */}

        {/* <li>
        
          
          {isMobile ? (
               <FaDatabase />
            ) : (
              <>{ <FaDatabase />} Leads Management</>
            )}
        </li> */}

        <li>
          <NavLink to=" " activeclassname="active">
           {isMobile ? (
              <FaPen />
            ) : (
              <>{ <FaComment />} Reports</>
            )}
          </NavLink>
          {/* <FaComment /> Reports */}
          
            {/* {isMobile ? (
              <FaPen />
            ) : (
              <>{ <FaComment />} Reports</>
            )} */}
          </li>
       

        <li>
          <NavLink to=" " activeclassname="active">
         {isMobile ? (
             <FaLink />
            ) : (
              <>{<FaLink />} Site Visits</>
            )}
          </NavLink>

          {/* <FaLink /> Site Visits */}
          {/* {isMobile ? (
             <FaLink />
            ) : (
              <>{<FaLink />} Site Visits</>
            )} */}
        </li>

        <li>
          <NavLink to=" " activeclassname="active">
         {isMobile ? (
             <FaInbox />
            ) : (
              <>{  <FaInbox />} Leave Requets</>
            )}
          </NavLink>
          {/* <FaInbox /> Leave Requets */}
         
            {/* {isMobile ? (
             <FaInbox />
            ) : (
              <>{  <FaInbox />} Leave Requets</>
            )} */}
       
        </li>
        {/* <li>
          <Link to="/notice">Notice</Link>
        </li> */}

        {/* <li>
          <NavLink to={todayFollowupLink} activeclassname="active">
            <FaComment /> Today team follows up
          </NavLink>
        </li> */}

        <li>
          <NavLink to="/setting" activeclassname="active">
          {isMobile ? (
              <FaCog />
            ) : (
              <>{ <FaCog />} Settings</>
            )}
          </NavLink>
          {/* <FaCog /> Settings */}
       
            {/* {isMobile ? (
              <FaCog />
            ) : (
              <>{ <FaCog />} Settings</>
            )} */}
       
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
