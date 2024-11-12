import { createBrowserRouter } from 'react-router-dom';
import App from '../App.js'
import React from 'react'


import AdminPage from './adminPage';
import Register from './resgister';
import Login from './login'
import UserPage from './UserPage'



export const Router = createBrowserRouter([
{
  path: "/",
  element: <App />,
  children: [
    { path: "/", element: <Login /> },
    { path: "register", element: <Register /> },
    {path:"/user/:username",element:<UserPage/>},
    {path:"/admin", element:<AdminPage/>},
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
