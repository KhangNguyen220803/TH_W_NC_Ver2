import express from 'express'
import getHomePage from '../controllers/homeController'
import aboutPage from '../controllers/aboutController'
import User from '../controllers/userController'

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
    return app.use('/', router)
}

export default initWebRouter
