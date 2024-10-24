import pool from '../config/connectDB'
const getAllUser = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`')
    return rows
}

const getDetailUser = async (username) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE username=?', [username])
    return rows[0]
}

const addUser = async (username, password, fullname, address, sex, email) => {
    await pool.execute('INSERT INTO `users` (`username`, `password`, `fullname`, `address`, `sex`, `email`) VALUES (?, ?, ?, ?, ?, ?)', [username, password, fullname, address, sex, email])

}

const fillUserForm = async (username) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users` WHERE username=?', [username])
    return rows[0]
}
const updateUser = async ( password, fullname, address, sex, email, username) => {
    await pool.execute("UPDATE `users` SET  `password`=?, `fullname`=?, `address`=?, `sex`=?, `email`=? where `username`=?", [ password, fullname, address, sex, email, username])

}

const deleteUser = async (username) => {
    await pool.execute('DELETE FROM users WHERE username=?', [username])
}





export default { getAllUser, getDetailUser, addUser, deleteUser, updateUser, fillUserForm }