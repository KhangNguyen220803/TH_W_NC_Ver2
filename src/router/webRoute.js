import express from 'express'
import getHomePage from '../controllers/homeController'
import aboutPage from '../controllers/aboutController'
import User from '../controllers/userController'

const router = express.Router()
const initWebRouter = (app) => {

    // router.get('/', (req, res) => {
    //     res.send('birds home page')
    // })

    // router.get('/about', (req, res) => {
    //     res.send('aboit birds')
    // })

    router.get('/', getHomePage)
    router.get('/about', aboutPage)
    router.get('/user', User.getAllUser)
    router.get('/addUser', User.showUserForm)
    router.get('/editUser/:masv', User.fillUserForm)
    router.post('/editUser/:masv', User.updateUser)
    router.post('/addUser', User.addUser)
    router.post('/deleteUser', User.deleteUser)
    router.post('/searchUser', User.searchUser)
    router.get('/detailUser/:masv', User.getDetailUser)


    return app.use('/', router)
}

export default initWebRouter
