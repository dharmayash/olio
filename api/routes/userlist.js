const express = require('express');
const route = express.Router();
const Users = require('../models/User');

route.get('/list', (req, res, next)=>{
    var page = req.params.page || 1;
    const options = {
        select: '_id CUSTOMER_NAME',
        page: page,
        limit: 10,
    };

    Users.paginate({}, options).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

route.get('/filter', (req, res, next)=>{
    Users.find().distinct('CPE_FAILOVER').then(docs=>{    
        res.status(200).json({
            message:"user fetched successfully",
            customer:docs
        });
    }).catch(err=>{throw err;});
})

route.get('/:id', (req, res, next)=>{
    var id = req.params.id;
    Users.findById(id).limit(10).then(docs=>{    
        res.status(200).json({
            message:"user fetched successfully",
            customer:docs
        });
    }).catch(err=>{throw err;});
})

module.exports = route;