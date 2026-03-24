import React, { useState } from 'react'
import "../styles/Form.scss";
import { Link } from 'react-router';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder='Enter username' name='username' id='username' onChange={()=>{
                     setUsername(e.target.value)
                }} />
                <input type="password" placeholder='Enter password' name='password' id='password'  />
                <button className='button primary-button'>Login</button>
            </form>
            <p>Don't have an account? <Link to="/registe">register</Link></p>
        </div>
    </main>
  )
}

export default Login