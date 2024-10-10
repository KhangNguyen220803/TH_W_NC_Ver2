import express from "express"
import userModel from "../services/userModel"

const multer = require('multer');
const path = require('path');



const getAllUser = async (req, res) => {
    let userList = await userModel.getAllUser()
    res.render('src/views/listUser.ejs', { data: { title: 'list user', page: 'listUser', rows: userList } })
}


const getDetailUser = async (req, res) => {
    // if (isAuthentication(req, res) == true) {
    let username = req.params.username
    let userDetail = await userModel.getDetailUser(username)
    res.render('src/views/detailUser.ejs', { data: { title: 'detail user', page: 'detailUser', rows: userDetail } })
    // }

}

const showUserForm = async (req, res) => {


    res.render('src/views/addUser.ejs', { data: { title: 'add user', page: 'addUser' } })



}

const addUser = async (req, res) => {
    try {
     

            // Lấy dữ liệu từ body request
            let { username, password, fullname, address, sex, email} = req.body;
            

            // Lưu user vào cơ sở dữ liệu
            await userModel.addUser(username, password, fullname, address, sex, email);

            // Chuyển hướng sau khi thành công
            res.redirect('/addUser');

    
    } catch (error) {
        res.status(500).send({ message: 'Server Error' });
    }
};

const fillUserForm = async (req, res) => {
    let username = req.params.username
    let dataUser = await userModel.fillUserForm(username)
    res.render('src/views/editUser.ejs', { data: { title: 'edit user', page: 'editUser', rows: dataUser } })

}



const updateUser = async (req, res) => {
    try {


            // Lấy dữ liệu từ body request
            let {  password, fullname, address, sex, email, username} = req.body;
            // Lưu user vào cơ sở dữ liệu

            await userModel.updateUser( password, fullname, address, sex, email, username);

            // Chuyển hướng sau khi thành công
            res.redirect('../user');

    } catch (error) {
        res.status(500).send({ message: 'Server Error' });
    }
};

const deleteUser = async (req, res) => {
    let { username } = req.body
    await userModel.deleteUser(username)
    res.redirect('user')


}



export default { getAllUser, getDetailUser, addUser, showUserForm, deleteUser, fillUserForm, updateUser }


