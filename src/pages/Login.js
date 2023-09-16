import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/users/1')
      .then(res => res.json())
      .then(json => setUserData(json))
      .catch(err => console.log(err));
  }, []);

  const handleLogin = async () => {
    try {
      if (username === userData?.username && password === userData?.password) {
        setErrorMessage('');
        onLoginSuccess({ username: userData.username, id: userData.id }); // Including id as well for local storage key
        navigate('/'); // Navigates back to the main page

        // Here we retrieve the user's cart from local storage
        const userCart = JSON.parse(localStorage.getItem(`userCart_${userData.id}`)) || [];
        setCartItems(userCart); // Assuming setCartItems is obtained from CartContext or another method to update cart items
      } else {
        setErrorMessage('Wrong username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error here (you might set an error message to state to display to the user)
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
