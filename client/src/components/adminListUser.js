import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Các biểu tượng cho Xem, Sửa, Xóa
import 'bootstrap/dist/css/bootstrap.min.css'; // Nhúng Bootstrap
import { Link } from 'react-router-dom';
function ListUser() {
  const [users, setUsers] = useState([]);

  // Lấy danh sách người dùng khi component được tải
  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm lấy dữ liệu người dùng từ API
  const fetchUsers = () => {
    fetch('http://localhost:3000/api/admindataUser')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      });
  };

  // Hàm reload danh sách sinh viên
  const handleReload = () => {
    fetchUsers();  // Gọi lại hàm fetchUsers để cập nhật danh sách sinh viên
  };

  // Hàm xử lý xóa người dùng
  const handleDelete = async (e, masv) => {
    // e.preventDefault();



    try {
      const response = await fetch(`http://localhost:3000/deleteUser/${masv}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Sau khi xóa thành công, gọi hàm reload để cập nhật danh sách
        handleReload();
      } else {
        const data = await response.json();
        console.error(`Lỗi: ${data.message}`);
      }
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
    }
  };

  return (


    // Header
<>



    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        
        <a class="navbar-brand" href="#">Hello Admin {users.fullname}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/admin">Home</a>
          </li>
          <li class="nav-item">
            <Link className="nav-link active" to="/adminListUser"> ListUser</Link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        
        <Link to="/logout"> Logout</Link>
      </div>
    </div>
  </nav>


    <div className="container mt-5">
      <h1 className="text-center mb-4">List Users</h1>

      <table className="table table-striped table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>STT</th>
            <th>Username</th>
            <th>Fullname</th>
            <th>Address</th>
            <th>Sex</th>
            <th>Email</th>
            
            <th>Xem</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.masv}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td>{user.address}</td>
              <td>{user.sex}</td>
              <td>{user.email}</td>
           
        
              <td>
                
                <a className="btn btn-link" href={`http://localhost:6868/detailUser/${user.masv}`}>
                <FaEye />
                </a>
              </td>
              <td>
                <a className="btn btn-link" href={`http://localhost:6868/editUser/${user.masv}`}>
                  <FaEdit />
                </a>
              </td>
              <td>
                <form onSubmit={(e) => handleDelete(e, user.masv)}>
                  <input type="hidden" value={user.masv} name="masv" />
                  <button type="submit" className="btn btn-link text-danger">
                    <FaTrash />
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
}

export default ListUser;
