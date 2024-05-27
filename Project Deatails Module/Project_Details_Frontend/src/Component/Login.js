import React, { useState } from 'react';
import "../Css/Login.css";
import { useNavigate } from 'react-router-dom';
// import loginss from './loginss.png';
import ImageSlider from './ImageSlider';

const Login = () => {
  const [Email, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3020/api/login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password }),
      });
      const data = await response.json();
      console.log(data); 
      if(response.ok){
        // alert("Login Successfully!!");
        sessionStorage.setItem('userEmail', Email);
        navigate('/table');
      }
      else{
        alert("Wrong Credentials!!");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='bgc'>
      
        <div className='formb'>
          <p className='para'>Login</p>
          <p className='paras'>to access</p>
        <form onSubmit={handleSubmit}>
  <div className='cont'>
    <label>Email</label>
    <input
      type="text"
      placeholder="Email"
      value={Email}
      className='input-fd'
      onChange={(e) => setUsername(e.target.value)}
    />
    <label>Password</label>
    <input
      type="password"
      placeholder="Password"
      value={Password}
      className='input-fd'
      onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit" className='but'>Login</button>
  </div>
</form>

    </div>
    <ImageSlider />
    </div>
  );
};

export default Login;
