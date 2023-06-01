
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('auth-token');
      localStorage.setItem('auth-token', token)
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the email to the server
    fetch(`${process.env.REACT_APP_base_url}/user/forgot_password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          setMessage('Email sent successfully');
          // Display a success message or redirect to a confirmation page
        } else {
          setMessage('Error sending email');
          // *Display an error message
        }
      })
      .catch((error) => {
        setMessage('Error sending email');
        // Display an error message
      });
  };

  return (
    <div style={{marginTop:'300px'}}>
      <form onSubmit={handleSubmit}>
        <h3>You forgot Your passowrd ? Dont worry we will sen you a link. just enter your email</h3>
         <br />
        <label htmlFor="email-input">Email:</label><br />
        <input
          type="email"
          id="email-input"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit">Send Email</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPasswordForm;
