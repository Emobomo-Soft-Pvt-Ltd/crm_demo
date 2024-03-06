import React, { useState } from "react";
import "./css/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const LoginDemo = () => {
  //   const [name, setName] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "Admin@123") {
      const credentials = {
        name: "Admin", // You can customize this based on your needs
        email,
        password,
      };

      login(credentials);
      navigate("./dashboard");
    } else if (email === "user@gmail.com" && password === "User@123") {
      const credentials = {
        name: "User1", // You can customize this based on your needs
        email,
        password,
      };

      login(credentials);
      navigate("./dashboard");
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <div className="login max-h-screen">
      <div className="loginMenu">
        <div className="formm">
          <form className="loginForm" onSubmit={handleSubmit}>
          <img  style={{ position: 'relative', top: '-15px' }}
              src="../../assets/logo.png"
              alt="Logo"
              className="logo"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              name="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
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

export default LoginDemo;
