
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminPage from './adminPage';
import Resgister from './resgister';
import Login from './login'
import UserPage from './UserPage'
function Routers() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/user/:username" element={<UserPage/>} />
          <Route path="/resgister" element={<Resgister/>} />
          <Route path="/login" element={<Login/>} />
 {/* <Route path="/admin" element={<AdminPage/>} /> */}

        </Routes>
      </Router>

    </>

  );
}

export default Routers;
