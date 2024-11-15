import pool from '../config/connectDB';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const getAdmin = async (role) => {
  const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE role=?', [role])
  return rows[0]
}

const getUser = async (role,username) => {
  const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE role=? AND username=?', [role,username])
  return rows[0]
}

const getDetailUser = async (username) => {
  const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE username=?', [username])
  return rows[0]
}


// Hàm để tìm user theo username
const findUserByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows.length > 0 ? rows[0] : null;
};

// Hàm để tạo user mới (nếu cần đăng ký)

const createUser = async (username, password ,fullname, address, sex, email, role ) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query('INSERT INTO users (username, password ,fullname, address, sex, email, role) VALUES (?, ?, ?, ?, ?, ?, ?)', [
    username,
    hashedPassword,
    fullname,
    address,
    sex,
    email,
    role,
  ]);
  return result[0].insertId;
};


const AdmingetinfUser = async (role) => {
  const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE role=?', [role])
  return rows
}

const fillUserProfile = async (username) => {
  const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE username=?', [username])
  return rows[0]
}
const updateUser = async (fullname, address, sex, email, username) => {
  await pool.execute("UPDATE `users` SET  `fullname`=?, `address`=?, `sex`=?, `email`=? WHERE `username`=?", [fullname, address, sex, email, username])

}
const deleteUser = async (username) => {
  await pool.execute('DELETE FROM users WHERE username=?', [username])
}
// Xuất model
export default {
  updateUser,
  findUserByUsername,
  createUser,
  getAdmin,
  getUser,
  AdmingetinfUser,
  fillUserProfile,
  getDetailUser,
  deleteUser
};