import dotenv from "dotenv"
import express from 'express'
// import date from "../date"
// import getUrl from "../getUrl"
import viewEngine from "./config/viewEngine"
import initWebRouter from "./router/webRoute"
import path from 'path'
import bodyParser from "body-parser"

const app = express()


dotenv.config()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

viewEngine(app)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))


initWebRouter(app)



// app.get('/date', function (req, res) {
//     res.send(date());
// })


// app.get('/geturl', function (req, res) {
//     res.send(getUrl.getPath(req))
// })

// app.get('/ejs', function (req, res) {
//     res.render("test")
// })

// app.get('/', function (req, res) {
//     res.render("home")
// })

// app.get('/about', function (req, res) {
//     res.render("about")
// })




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
