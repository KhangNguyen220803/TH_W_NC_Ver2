import React, { useState } from 'react';
import axios from 'axios';

const Resgister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/resgister', {
        username,
        password,
        fullname,
        address,
        sex,
        email,
      });
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
    } catch (error) {
      setMessage(error.response?.data.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">Fullname</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sex" className="form-label">Sex</label>
          <select
            className="form-select"
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
           
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
      <div className="mt-3 text-center">
        <a href="http://localhost:6868/login" className="text-decoration-none">Already have an account? Login</a>
      </div>
    </div>
  );
};

export default Resgister;
