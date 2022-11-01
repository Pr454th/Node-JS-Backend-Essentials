const fs=require('fs');
const { promisify } = require('util');
const appendFile=promisify(fs.appendFile);
const path=require('path');

exports.addNote=async (req,res)=>{
    try{
        console.log(req.body);
        await appendFile(path.join('./', 'notes.txt'),`${req.body.title}-->${req.body.note}\n`,
        (error)=>{
            console.log("failed to add note...");
        });
        res.status(200).send('<h1>Title:'+`${req.body.title}\n`+'Note:'+req.body.note+'</h1>');
    }
    catch(err){
        console.log(err);
    }
}