
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminPage from './adminPage';
import Resgister from './resgister';
import Login from './login'
function Routers() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/resgister" element={<Resgister/>} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/login" element={<Login/>} />


        </Routes>
      </Router>

    </>

  );
}

export default Routers;
