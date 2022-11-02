const fs=require('fs');
const { promisify } = require('util');
const readFile=promisify(fs.readFile);
const path=require('path');

const errLogger=async (err,req,res,next)=>{
    if(err){
        fs.appendFile(path.join('./logs', 'errorlogs.txt'),`${new Date().toDateString()} --> ${err.message}\n`,
        (error)=>{
            if(error)
                console.log("logging failed...");
        });
        const data=await readFile('./logs/errorlogs.txt','utf8');
        console.log(data);
        if(err.status){
            res.status(err.status);
        }
        else{
            res.status(500);
        }
        res.json({
            status:'error',
            message:err.message
        });
    }
}

module.exports=errLogger;