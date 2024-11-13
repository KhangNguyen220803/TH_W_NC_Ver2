import { createBrowserRouter } from 'react-router-dom';
import App from '../App.js'
import React from 'react'


import AdminPage from './adminPage'
import AdminListUser from './adminListUser.js'
import Register from './resgister'
import Login from './login'
import Logout from './autoLogout.js'
import UserPage from './UserPage'
import ProfileUser from './profileUser.js'


export const Router = createBrowserRouter([
{
  path: "/",
  element: <App />,
  children: [
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/logout", element: <Logout /> },
    { path: "resgister", element: <Register /> },
    {path:"/user/:username",element:<UserPage/>},
    {path:"/admin", element:<AdminPage/>},
    {path:"/adminListUser", element:<AdminListUser/>},
    {path:"/profileUser/:username", element:<ProfileUser/>},
    { path: "*", element: <div>Không tìm thấy web theo yêu cầu</div> }
  ]

}
]);






// function Routers() {

//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/admin" element={<AdminPage/>} />
//           <Route path="/user/:username" element={<UserPage/>} />
//           <Route path="/resgister" element={<Resgister/>} />
//           <Route path="/login" element={<Login/>} />


//         </Routes>
//       </Router>

//     </>

//   );
// }

// export default Routers;
