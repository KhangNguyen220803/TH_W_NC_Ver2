
// var http = require('http');
import http from "http"
// var date=require("./date")
import date from "./date"
// var getUrl = require("./getUrl")
import getUrl from "./getUrl";


http.createServer(function (req,res){


    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});

    res.write(date()+ "<br>");

    res.write(getUrl.getPath(req) + "<br>");
    
    res.write(getUrl.getParamsUrl(req) + "<br>");
    res.write('Hello KTPM0121, Chúc bạn thành công với node js');

    res.end();

}).listen(8080);