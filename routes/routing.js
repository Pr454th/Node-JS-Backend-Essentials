const express=require('express');
const myController=require('../controllers/controller');
const notesHandler=require('../controllers/notesHandler')
const router=express.Router();


// router.use(Logger);
router.post('/note',notesHandler.addNote);

//router lvl middleware
const Logger=(req,res,next)=>{
    console.log(`req method ${req.method}`);
    console.log(`req url ${req.url}`);
    next();
}

//specific middleware
// router.use('/packages',Logger);
// router.get('/packages',myController.Packages);
// router.post('/bookpackage',myController.bookPackage);
// router.post('/login',myController.login);
// router.all('/all',myController.All);

module.exports=router