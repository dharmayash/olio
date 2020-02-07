const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();
const Users = require('../models/User');

// route.post('/add', (req, res, next)=>{
//     const newuser=new Users({
//            _id: new mongoose.Types.ObjectId(),
//            customerName: "Satya"
//        });
//        newuser.save().then(docs=>{    
//            console.log(docs);      
//            res.status(201).json({
//                message:"user added successfully",
//                customer:docs
//            });
//        }).catch(err=>{throw err;});
// })

route.get('/list', (req, res, next)=>{
   
       Users.findById('5e3c21d176abe4438fcf98ac').then(docs=>{    
           console.log(docs);      
           res.status(201).json({
               message:"user fetched successfully",
               customer:docs
           });
       }).catch(err=>{throw err;});
})

module.exports = route;