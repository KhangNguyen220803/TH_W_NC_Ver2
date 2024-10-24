import pool from '../config/connectDB';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Hàm để tìm user theo username
const findUserByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows.length > 0 ? rows[0] : null;
};

// Hàm để tạo user mới (nếu cần đăng ký)

const createUser = async (username, password ) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [
    username,
    hashedPassword,
  ]);
  return result[0].insertId;
};

// Xuất model
export default {
  findUserByUsername,
  createUser,
};