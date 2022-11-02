const fs=require('fs');
const { promisify } = require('util');
const appendFile=promisify(fs.appendFile);
const path=require('path');
const notesModel = require('../db/model');
const sanitize=require('mongo-sanitize');

exports.getNotes=async (req,res)=>{
    try{
        const notes=await notesModel.find({},{_id:0,__v:0});
        if(notes.length>0){
            res.status(200).json({
                status:"success",
                result:notes.length,
                data:{notes}
            });
        }
        else{
            res.status(400).json({
                status:"success",
                result:"no data to get"
            });
        }
    }
    catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.getNote=async (req,res)=>{
    try{
        const note=await notesModel.find({id:req.params.id},{_id:0,__v:0});
        if(note.length>0){
            res.cookie('noteID',req.params.id);
            //cookie info
            console.log(req.cookies.noteID);
            // res.cookie('noteID',req.params.id,{expires:new Date(),maxAge:99999,path:'/getnote'});
            //deleting cookie
            // res.clearCookie('noteID');
            res.status(200).json({
                status:"success",
                result:note.length,
                data:{note}
            });
        }
        else{
            res.status(400).json({
                status:"success",
                result:"no data to get"
            });
        }
    }
    catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.updateNote=async (req,res)=>{
    try{
        console.log(req.body);
        console.log(req.params.id);
        //sanitizing-removing data with code
        let id=sanitize(req.params.id);
        const uNote=await notesModel.findOneAndUpdate({id:id},req.body,{
            new:true,
            runValidators:true,
        });
        if(uNote!=null){
            res.status(200).json({
                status:"success",
                result:uNote.length,
                data:{uNote}
            });
        }
        else{
            res.status(400).json({
                status:"success",
                result:"no note available with the id to update"
            });
        }
    }
    catch(err){
        res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.deleteNote=async (req,res)=>{
    try{
        const delNote=await notesModel.deleteOne({id:req.params.id});
        if(delNote!==0)
        {
            res.status(200).json({
                status:"success",
                result:`note with ${req.params.id} is deleted`});
        }
    }
    catch(err){
        res.send(404).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.addNotes=async (req,res)=>{
    try{
        const aNote=req.body;
        const newNote=await notesModel.create(aNote);
        console.log(newNote);
        res.status(201).json({
            status:"success",
            data:{newNote}
        });

        // console.log(req.body);
        // await appendFile(path.join('./', 'notes.txt'),`${req.body.title}-->${req.body.note}\n`,
        // (error)=>{
        //     console.log("failed to add note...");
        // });
        // res.status(200).send('<h1>Title:'+`${req.body.title}\n`+'Note:'+req.body.note+'</h1>');
    }
    catch(err){
        res.send(404).json({
            status:"fail",
            message:err.message
        })
    }
}