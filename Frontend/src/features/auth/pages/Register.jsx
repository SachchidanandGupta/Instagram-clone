import React from 'react'
import { useState } from 'react';
import "../styles/Form.scss";
import { Link } from 'react-router';
const Register = () => {
    const handleSubmit = (e) =>{
        e.preventDefault();
    }
  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder='Enter username' name='username' id='username' />
                <input type="email" placeholder='Enter email' name='email' id='email' />
                <input type="password" placeholder='Enter password' name='password' id='password'  />
                <button className='button primary-button'>Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register