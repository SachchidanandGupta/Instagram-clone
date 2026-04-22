import React, { useState } from "react";
import "../styles/Form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
const Login = () => {
  const { user, loading, handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleLogin(username,password)
    navigate("/");
  };
  if(loading){
    return (<main>
        <h1>Loading...</h1>
    </main>)
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            id="username"
            onInput={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            id="password"
            onInput={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
