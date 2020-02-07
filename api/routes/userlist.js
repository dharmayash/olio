const express = require('express');
const route = express.Router();
const Users = require('../models/User');

route.get('/list', (req, res, next)=>{
    var page = req.param('page') || 1;
    const options = {
        page: page,
        limit: 10,
        collation: {
          locale: 'en'
        }
    };
    Users.paginate({}, options).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

route.get('/list/:id', (req, res, next)=>{
    var id = req.params.id;
    Users.findById(id).limit(10).then(docs=>{    
        res.status(201).json({
            message:"user fetched successfully",
            customer:docs
        });
    }).catch(err=>{throw err;});
})

module.exports = route;