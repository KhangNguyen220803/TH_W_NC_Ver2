import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AutoLogout = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    // Xóa token và cookie
    Cookies.remove('token'); // Xóa cookie 'token'
    localStorage.removeItem('jwt'); // Xóa token JWT từ localStorage

    // Điều hướng về trang đăng nhập
    navigate('/login'); // Điều hướng đến trang đăng nhập
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-xl">Đang đăng xuất... Vui lòng chờ!</h1>
    </div>
  );
};

export default AutoLogout;
