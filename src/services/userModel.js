import pool from '../config/connectDB'
const getAllUser = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `sinhvien`')
    return rows
}

const getDetailUser = async (masv) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `sinhvien` WHERE masv=?', [masv])
    return rows[0]
}

const addUser = async (masv, hoten, gioitinh, diachi, dienthoai, cccd, lop, hinhanh) => {
    await pool.execute('INSERT INTO `sinhvien` (`masv`, `hoten`, `gioitinh`, `diachi`, `dienthoai`, `cccd`, `lop`, `hinhanh`) VALUES (?, ?, ?, ?, ?, ?, ?,?)', [masv, hoten, gioitinh, diachi, dienthoai, cccd, lop, hinhanh])

}

const fillUserForm = async (masv) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `sinhvien` WHERE masv=?', [masv])
    return rows[0]
}
const updateUser = async (hoten, gioitinh, diachi, dienthoai, cccd, lop, hinhanh, masv) => {
    await pool.execute("UPDATE `sinhvien` SET  `hoten`=?, `gioitinh`=?, `diachi`=?, `dienthoai`=?, `cccd`=?, `lop`=?, `hinhanh`=? WHERE `masv`=?", [hoten, gioitinh, diachi, dienthoai, cccd, lop, hinhanh, masv])

}

const deleteUser = async (masv) => {
    await pool.execute('DELETE FROM sinhvien WHERE masv=?', [masv])
}

const searchUser = async (search) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `sinhvien` WHERE masv=? OR hoten=? OR gioitinh=? OR diachi=? OR dienthoai=? OR cccd=? OR lop=?', [search, search , search, search, search ,search, search])
    return rows
}




export default { getAllUser, getDetailUser, addUser, deleteUser, updateUser, fillUserForm, searchUser }