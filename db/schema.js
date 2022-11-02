
//mongodb connection
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/notes').then(()=>{
    console.log("db connection establised...")
});

const schema=new mongoose.Schema({
        id:{
            type:Number,
            unique:true,
            required:[true,'Required Field'],
            min:1,
            max:100
        },
        title:{
            type:String,
            required:[true,'Required Field']
        },
        note:{type:String}
    },
    {
        timestamps:{
            createdAt:true,
            updatedAt:true
        }
    }
);
module.exports=schema;