import express from "express"
import productsModel from "../services/productsModel"

// const multer = require('multer');
const path = require('path');



const getAllGroups = async (req, res) => {
    let groupsList = await productsModel.getAllGroups()
    res.render('src/views/listGroups.ejs', { data: { title: 'list groups', page: 'listgroups', rows: groupsList } })
}

const getAllProducts = async (req, res) => {
    let productsList = await productsModel.getAllProducts()
    res.render('src/views/listProducts.ejs', { data: { title: 'list products', page: 'listproducts', rows: productsList } })
}





export default { getAllGroups,getAllProducts  }


