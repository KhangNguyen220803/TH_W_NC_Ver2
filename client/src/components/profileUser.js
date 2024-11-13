import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPage from './UserPage';

const ProfileUser = () => {
  const { username } = useParams(); 

  const [users, setUsers] = useState({});
  const [usernameState, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');

  // Fetch users data when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch user data from API
  const fetchUsers = () => {
    fetch(`http://localhost:3000/api/dataProfileUser/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Sync data from users object into individual state values
  useEffect(() => {
    if (users) {
      setUsername(users.username || '');
      setFullname(users.fullname || '');
      setAddress(users.address || '');
      setSex(users.sex || '');
      setEmail(users.email || '');
    }
  }, [users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      fullname,
      address,
      sex,
      email,
    };
  
    const response = await fetch(`http://localhost:3000/api/editProfileUser/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert('Error updating user: ' + data.message);
    }
  };
  
  return (
    <>
      <UserPage />
      <div className="container mt-5 w-50">
        <h2>My Profile</h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="hidden"
              className="form-control"
              id="username"
              value={usernameState}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <p className="form-control">
              {username}
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">Full name</label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              placeholder="Full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sex" className="form-label">Sex</label>
            <input
              type="text"
              className="form-control"
              id="sex"
              placeholder="Sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </>
  );
};

export default ProfileUser;
