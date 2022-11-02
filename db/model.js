const mongoose=require('mongoose');
const schema = require('./schema');

const notesModel=mongoose.model("myNotes",schema);
module.exports=notesModel;