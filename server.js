import dotenv from "dotenv"
import express from 'express'
// const express = require('express')
import date from "./date"

import getUrl from "./getUrl"

import viewEngine from "./viewEngine"



const app = express()


dotenv.config()
const port = process.env.PORT

viewEngine(app)

// app.get('/', function (req, res) {
//     res.send('Hello World')
// })

// app.get('/about', function (req, res) {
//     res.send('About')
// })


app.get('/date', function (req, res) {
    res.send(date());
})


app.get('/geturl', function (req, res) {
    res.send(getUrl.getPath(req))
})

app.get('/ejs', function (req, res) {
    res.render("test")
})

app.get('/', function (req, res) {
    res.render("home")
})

app.get('/about', function (req, res) {
    res.render("about")
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// app.listen(3000)