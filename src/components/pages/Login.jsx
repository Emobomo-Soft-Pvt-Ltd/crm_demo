import React, { useState } from "react";
import "./css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


const Login = () => {
  const [logoImage, setLogoImage] = useState(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/login", {
        email: values.email,
        password: values.password,
      });

      console.log(response.data);

      if (response.data.Status === "Success") {
        if (response.data.email !== undefined) {
          console.log(response.data);
          login(response.data); // Set the user data in the context
          navigate("/dashboard");
        } else {
          alert("Email data is undefined");
        }
      } else {
        alert(response.data.Message);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="login max-h-screen">
      
           
         

      <div className="loginMenu">
        <div className="formm">
          <form className="loginForm" onSubmit={handleLogin}>
          <img
              src="../../assets/logo.png"
              alt="Logo"
              className="logo"
            />
            <input
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              type="email"
              placeholder="email"
              name="email"
            />
            <input
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              type="password"
              placeholder="password"
              name="password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
