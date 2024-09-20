import express from "express"
import userModel from "../services/userModel"

const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ và tên file cho ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Thư mục chứa file upload
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file với timestamp
    }
});

// Cấu hình multer với bộ lọc file
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // Giới hạn kích thước file 1MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
});


// ---------------------------------------------------------------------------------------------


const getAllUser = async (req, res) => {
    let userList = await userModel.getAllUser()
    res.render('src/views/listUser.ejs', { data: { title: 'list user', page: 'listUser', rows: userList } })
}


const getDetailUser = async (req, res) => {
    // if (isAuthentication(req, res) == true) {
    let masv = req.params.masv
    let userDetail = await userModel.getDetailUser(masv)
    res.render('src/views/detailUser.ejs', { data: { title: 'detail user', page: 'detailUser', rows: userDetail } })
    // }

}

const showUserForm = async (req, res) => {


    res.render('src/views/addUser.ejs', { data: { title: 'add user', page: 'addUser' } })



}

const addUser = async (req, res) => {
    try {
        // Dùng multer để upload ảnh
        upload.single('hinhanh')(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: err });
            }

            // Lấy dữ liệu từ body request
            let { masv, hoten, gioitinh, diachi, dienthoai, cccd, lop } = req.body;
            let hinhanh = req.file ? req.file.filename : null;

            // Lưu user vào cơ sở dữ liệu
            await userModel.addUser(masv, hoten, gioitinh, diachi, dienthoai, cccd, lop, hinhanh);

            // Chuyển hướng sau khi thành công
            res.redirect('/addUser');

        });
    } catch (error) {
        res.status(500).send({ message: 'Server Error' });
    }
};

const fillUserForm = async (req, res) => {
    let masv = req.params.masv
    let dataUser = await userModel.fillUserForm(masv)
    res.render('src/views/editUser.ejs', { data: { title: 'edit user', page: 'editUser', rows: dataUser } })

}

// const updateUser = async (req, res) => {
//     // console.log(req.body)
//     // // let role = 0
//     // let{ hoten, gioitinh, diachi, dienthoai, cccd, lop, masv} = req.body
//     // // if('role' in req.body)
//     //     // role=1
//     // await userModel.updateUser(hoten, gioitinh, diachi, dienthoai, cccd, lop, masv)
//     // res.redirect(masv)

   

// }

const updateUser = async (req, res) => {
    try {
        // Dùng multer để upload ảnh
        upload.single('hinhanh')(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: err });
            }

            // Lấy dữ liệu từ body request
            let { masv, hoten, gioitinh, diachi, dienthoai, cccd, lop, hinhanhcu } = req.body;
            let hinhanh = req.file ? req.file.filename : hinhanhcu;

            // Lưu user vào cơ sở dữ liệu
            await userModel.updateUser( hoten, gioitinh, diachi, dienthoai, cccd, lop, hinhanh, masv);

            // Chuyển hướng sau khi thành công
            res.redirect('../user');

        });
    } catch (error) {
        res.status(500).send({ message: 'Server Error' });
    }
};

const deleteUser = async (req, res) => {
    let { masv } = req.body
    await userModel.deleteUser(masv)
    res.redirect('user')


}



const searchUser = async (req, res) => {
    let { search } = req.body
    let searchreturn = await userModel.searchUser(search)
    res.render('src/views/searchUser.ejs', { data: { title: 'search user', page: 'searchUser', rows: searchreturn } })

    // res.redirect('user')


}






// const createUser = (req, res) => {
//     res.render('src/views/home.ejs', {data: {title:'create new user' , page:'createNewUser'}})
// }

export default { getAllUser, getDetailUser, addUser, showUserForm, deleteUser, fillUserForm, updateUser, searchUser }


