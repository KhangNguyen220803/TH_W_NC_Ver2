import dotenv from "dotenv"
import express from 'express'
import viewEngine from "./config/viewEngine"
import initWebRouter from "./router/webRoute"
import initWebRouterAPI from "./router/webRouteAPI"

import path from 'path'
import bodyParser from "body-parser"

import cors from 'cors'


const app = express()


dotenv.config()
const port = process.env.PORT
app.use(cors()) 

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


viewEngine(app)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))


initWebRouter(app)
initWebRouterAPI(app)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
