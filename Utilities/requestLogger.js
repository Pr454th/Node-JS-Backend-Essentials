const fs=require('fs');
const { promisify } = require('util');
const appendFile=promisify(fs.appendFile);
const path=require('path');

const requestLogger=async (req,res,next)=>{
    try{
        await appendFile(path.join('./logs', 'requestlogs.txt'),`-->${new Date()}-${req.method}-${req.url}\n`,
        (error)=>{
            console.log("request logging failes...");
        });
        next();
    }
    catch(err){
        next(err);
    }
}
module.exports=requestLogger;