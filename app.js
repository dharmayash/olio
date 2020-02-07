const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan=require('morgan');
const bodyparser=require('body-parser');

const userlist = require('./api/routes/userlist');

mongoose.connect('mongodb+srv://olioDbUser:olioDbUser@cluster0-hh3xk.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology: true
}, ()=>{
    console.log('Connected To MongoDB Server !!')
});

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-Path, Content-Type, Accept, Authorization');
     if(res.send==="OPTIONS"){
         res.header('Access-Control-Allow-Methods','PUT, DELETE, PATCH, POST, GET');
         return res.status(200).json({});
     }
     next();
 })

//app.use('/adduser', adduser);
app.use('/user', userlist);

app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);  
  })
  
  app.use((error, req,res,next)=>{
      res.status(error.status || 500);
      res.json({
          error:{
              message:error.message
          }
      })
  })
module.exports = app;