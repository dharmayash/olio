const express = require('express');
const route = express.Router();
const Users = require('../models/User');

route.get('/list', (req, res, next)=>{
    var page = req.param('page') || 1;
    const options = {
        select: '_id CUSTOMER_NAME',
        page: page,
        limit: 10,
    };

    Users.paginate({}, options).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

route.get('/filter/by/city/:city', (req, res, next)=>{
    var page = req.param('page') || 1;
    var city = req.params.city;
    if(!city) res.status(500).json({message : 'Enter City !!'});
    const query = {
        CITY: {$regex: city, $options: 'i'}
    };
    const options = {
        select: '_id CUSTOMER_NAME',
        page: page,
        limit: 10,
    };
    Users.paginate(query, options).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

route.get('/graph/by/city', (req, res, next)=>{
    const aggregate = [
        {
            $group: {
                _id: '$CITY',
                count: { $sum: 1 }
            }
        }, { 
            $sort: { count : -1 }
        },{
            $limit : 10
        }
    ];
    Users.aggregate(aggregate).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

route.get('/detail/:id', (req, res, next)=>{
    var id = req.params.id;
    Users.findById(id).limit(10).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

module.exports = route;