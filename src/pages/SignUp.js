import React, { useState } from 'react';
//import './SignUp.css'

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    phone: '',
  });

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
        username: formData.name,
        password: formData.password,
        name: {
          firstname: formData.name.split(' ')[0],
          lastname: formData.name.split(' ')[1] || '',
        },
        phone: formData.phone,
      })
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Signup</h2>
      <input 
        type="email" 
        placeholder="Email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
      />
      <input 
        type="text" 
        placeholder="Name" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
      />
      <input 
        type="text" 
        placeholder="Phone" 
        name="phone" 
        value={formData.phone} 
        onChange={handleChange} 
      />
      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
}

export default Signup;
