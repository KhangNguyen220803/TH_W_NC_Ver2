import express from 'express'
import getHomePage from '../controllers/homeController.js'
import aboutPage from '../controllers/aboutController.js'
import User from '../controllers/userController.js'
import Products from '../controllers/productsController.js'
const router = express.Router()
const initWebRouter = (app) => {
    router.get('/', getHomePage)
    router.get('/about', aboutPage)
    router.get('/user', User.getAllUser)
    router.get('/addUser', User.showUserForm)
    router.get('/editUser/:username', User.fillUserForm)
    router.post('/editUser/:username', User.updateUser)
    router.post('/addUser', User.addUser)
    router.post('/deleteUser', User.deleteUser)
    router.get('/detailUser/:username', User.getDetailUser)
    router.get('/listGroups', Products.getAllGroups)
    router.get('/listProducts', Products.getAllProducts)

    return app.use('/', router)
}

export default initWebRouter
