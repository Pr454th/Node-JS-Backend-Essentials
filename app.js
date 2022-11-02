const express=require('express');
const app=express();
const router=require('./routes/routing');
const bodyparser=require('body-parser');
const morgan=require('morgan');
const fs=require('fs');
const path=require('path');
const https=require('https');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const helmet=require('helmet');

//request logger midddleware
const requestLogger=require('./Utilities/requestLogger')

//error handling middleware
const errLogger=require('./Utilities/errorLogger')
app.all('/note*',(req,res,next)=>{
  let err=new Error();
  err.message="Invalid Path";
  err.status=404;
  next(err);
});

//morgan miidleware for writing logs
const LogStream = fs.createWriteStream(path.join('./logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: LogStream }));

//helmet for security
app.use(helmet());

app.use(errLogger);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(requestLogger);
app.use(cookieParser());
app.use(session());
app.use('/',router);

//signed cookie cookie with a signature
// app.use(cookieParser('ABC234R'));

//bcryptjs
const bcrypt=require('bcryptjs');
const gensalt=bcrypt.genSaltSync(10);
const hashP=bcrypt.hashSync('prasath123',gensalt);
console.log(hashP);

//server with https
// https.createServer({
//   key:fs.readFile('sshServer.key'),
//   cert:fs.readFile('sshServer.cert')
// },app).listen(3000,()=>{
//   console.log("server running on 3000...");
// })

//normal server running
app.listen(3000,()=>{
  console.log("server running on 3000...")
})