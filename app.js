const express=require('express');
const app=express();
const router=require('./routes/routing');
const bodyparser=require('body-parser');
const morgan=require('morgan');
const fs=require('fs');
const path=require('path');

//request logger midddleware
// const requestLogger=require('./controllers/requestLogger')
// app.use(requestLogger);

//error handling middleware
const errLogger=require('./controllers/errorLogger')
app.get('/note',(req,res,next)=>{
  let err=new Error();
  err.message="Invalid Path";
  err.status=404;
  next(err);
});

//morgan miidleware for writing logs
const LogStream = fs.createWriteStream(path.join('./logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: LogStream }));

app.use(errLogger);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/',router);
app.listen(3000,()=>{
  console.log("server running on 3000...")
})