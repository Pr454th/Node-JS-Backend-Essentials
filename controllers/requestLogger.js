const fs=require('fs');
const { promisify } = require('util');
const appendFile=promisify(fs.appendFile);

const requestLogger=async (req,res,next)=>{
    try{
        await appendFile('requestlogs.txt',`-->${new Date()}-${req.method}-${req.url}\n`,
        (error)=>{
            console.log("reques logging failes...");
        });
        next();
    }
    catch(err){
        next(err);
    }
}
module.exports=requestLogger;