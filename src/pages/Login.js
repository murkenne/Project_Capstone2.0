import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then(res => res.json())
    .then(json => {
      if(json.status === 'error') {
        setErrorMessage('Wrong username or password');
      } else {
        setErrorMessage('');
        onLoginSuccess(json); 
        navigate('/'); // Navigates back to the main page
      }
    })
    .catch(err => {
      console.log(err);
      setErrorMessage('An error occurred. Please try again.');
    });
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
