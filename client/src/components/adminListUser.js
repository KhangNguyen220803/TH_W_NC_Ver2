import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Các biểu tượng cho Xem, Sửa, Xóa
import 'bootstrap/dist/css/bootstrap.min.css'; // Nhúng Bootstrap
import { Link } from 'react-router-dom';
import AdminPage from './adminPage.js'
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

    <AdminPage/>

    


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
