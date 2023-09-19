import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext'; 
import { UserContext } from '../contexts/UserContext'; // Import UserContext

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const { setCart } = useContext(CartContext); 
  const { setIsLoggedIn } = useContext(UserContext); // Get the setIsLoggedIn method from UserContext

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/users/1');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = async () => {
    try {
      if (username === userData?.username && password === userData?.password) {
        setErrorMessage('');
        setIsLoggedIn(true); // Set isLoggedIn to true on successful login
        onLoginSuccess({ username: userData.username, id: userData.id });
        navigate('/');

        const userCart = JSON.parse(localStorage.getItem(`userCart_${userData.id}`)) || [];
        setCart(userCart);
      } else {
        setErrorMessage('Wrong username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
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
