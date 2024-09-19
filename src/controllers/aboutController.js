import express from 'express'
const aboutPage = (req,res)=>{
    return res.render('src/views/about.ejs', {data: { title:'About Websize' , content:'@adminabc.com.vn'}})
}

export default aboutPage