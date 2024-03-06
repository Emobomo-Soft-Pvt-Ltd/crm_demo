import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaLock, FaUser } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = () => {
  const { logout,user } = useAuth();

  const [logoImage, setLogoImage] = useState(null);
  useEffect(() => {
    const fetchInitialLogo = async () => {
      try {
        const response = await axios.get("http://localhost:8081/logo");
        console.log("Logo Data:", response.data); // Log the received data
        setLogoImage(response.data.logo_image);
      } catch (err) {
        console.error("Axios Error:", err);
      }
    };

    // Fetch the initial logo only after the component has mounted
    fetchInitialLogo();
  }, []);

  return (
    <div>
      <div id="main-navbar" className="navbar">
        {/* <h2 className="logo">{user ? user.employee_name : ""}</h2> */}
        <div className="brand">
          {/* {logoImage && (
            <img
              src={`http://localhost:8081/logos/${logoImage}`}
              alt="Logo"
              className="logo"
            />
          )} */}
           <img
              src="../../assets/logo1.png"
              alt="Logo"
              className="logo"
            />
          {console.log(logoImage)}
        </div>
        <nav>
          <ul className="hul">
            <li className="hli">
              <a className="ha" href="/" onClick={logout}>
                <FaLock size={30} color="white" className="icon" />
                Logout
              </a>
            </li>
            <li className="hli">
              <Link to={`/updateEmployee/${user.id}`}>
              <FaUser size={30} color="white" className="icon" />
                Profile</Link>
            </li>
            {/* <li className="hli">
             <Link to="/updateEmployee">Profile</Link>
              <a className="ha" href="/" onClick={logout}>
                <FaUser size={30} color="white" className="icon" />
               Profile
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
