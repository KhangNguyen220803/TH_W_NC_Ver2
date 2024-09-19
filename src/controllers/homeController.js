import express from "express"
const getHomePage = (req, res) => {

    return res.render("src/views/home.ejs", {data:{ title:'home page', page:'main'}})
    
}

export default getHomePage