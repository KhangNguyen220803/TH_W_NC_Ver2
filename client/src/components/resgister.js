import React, { useState } from 'react';
import axios from 'axios';

const Resgister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/resgister', {
        username,
        password,
      });
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
    } catch (error) {
      setMessage(error.response?.data.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Resgister</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Resgister;
