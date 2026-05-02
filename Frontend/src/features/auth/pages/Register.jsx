import React from "react";
import { useState } from "react";
import "../styles/Form.scss";
import {  Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
const Register = () => {
  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(username,email,password);
    naviagte("/");
  };

  if (loading) {
    return <main>Loading...</main>;
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Enter username"
            name="username"
            id="username"
          />
          <input
          onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            placeholder="Enter email"
            name="email"
            id="email"
          />
          <input
          onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            placeholder="Enter password"
            name="password"
            id="password"
          />
          <button className="button primary-button">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
