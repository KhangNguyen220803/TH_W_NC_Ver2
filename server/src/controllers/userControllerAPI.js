import express from "express";
import userModelAPI from "../services/userModelAPI.js";
import bcrypt from 'bcryptjs'; // Dùng để kiểm tra mật khẩu đã mã hóa
import jwt from 'jsonwebtoken';

const sendFillAdmin = async (req, res) => {
  let role = '1'
  let infAdmin = await userModelAPI.getAdmin(role)
  res.json(infAdmin)
}
const sendFillUser = async (req, res) => {
  let role = '0'
  let username = req.params.username
  let infUser = await userModelAPI.getUser(role,username)
  res.json(infUser)
}

const Login = async (req, res) => {
  const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {

  

      // Tìm user trong database
      const user = await userModelAPI.findUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Kiểm tra password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      // console.log('Entered password:', password);
      // console.log('Hashed password in DB:', user.password);
      
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      
      // Tạo JWT token
      const token = jwt.sign({ id: user.id, username: user.username ,role: user.role}, 'your_jwt_secret_key', {
        expiresIn: '1h',
      });

      // Gửi phản hồi thành công
      return res.status(200).json({
        message: 'Login successful',
        token,
        user: user

      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
  const Resgister = async (req, res) => {
    const { username, password, fullname, address, sex, email } = req.body;
  
    // Kiểm tra nếu username và password không được cung cấp
    if (!username || !password || !fullname || !address || !sex || !email) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      // Kiểm tra xem username đã tồn tại trong database chưa
      const existingUser = await userModelAPI.findUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }
  
      // Tạo người dùng mới
      const role = "0";
      const userId = await userModelAPI.createUser(username, password ,fullname, address, sex, email, role);
  
      // Tạo JWT token sau khi đăng ký thành công
      const token = jwt.sign({ id: userId, username }, 'your_jwt_secret_key', {
        expiresIn: '1h',
      });
  
      // Gửi phản hồi thành công kèm theo token
      return res.status(201).json({
        message: 'User registered successfully',
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  export default { Resgister, Login, sendFillAdmin, sendFillUser };