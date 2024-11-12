import pool from '../config/connectDB'
const getAllGroups = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `nhom`')
    return rows
}


const getAllProducts = async () => {
    const [rows, fields] = await pool.execute('SELECT *,sanpham.ten as tensp, nhom.ten as tennhom FROM `sanpham`,`nhom` WHERE nhom.idnhom=sanpham.idnhom')
    return rows
}


export default {getAllGroups,getAllProducts}