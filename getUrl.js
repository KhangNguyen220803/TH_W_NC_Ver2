
// var url=require('url')
import url from "url"

const getPath = (req) => {
    return req.url;
}


const getParamsUrl = (req) => {
    let urlData = url.parse(req.url, true);
    return JSON.stringify(urlData.query);
}
// module.exports={getPath, getParamsUrl}
export default { getPath, getParamsUrl };