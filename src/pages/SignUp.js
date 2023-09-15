import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; 

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    fetch('https://fakestoreapi.com/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        name: {
          firstname: formData.firstName,
          lastname: formData.lastName,
        },
        // phone: formData.phone, // Removed as phone data is not in the initial state
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      alert("Congratulations on signing up!");
      navigate('/'); // Navigate to the main page
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <input 
        type="text" 
        placeholder="First Name" 
        name="firstName" 
        value={formData.firstName} 
        onChange={handleChange} 
      />
      <input 
        type="text" 
        placeholder="Last Name" 
        name="lastName" 
        value={formData.lastName} 
        onChange={handleChange} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
      />
      <input 
        type="text" 
        placeholder="Username" 
        name="username" 
        value={formData.username} 
        onChange={handleChange} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
      />
      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
}

export default Signup;
