const express = require('express');
const route = express.Router();
const Users = require('../models/User');
const selectVal = "_id CUSTOMER_NAME CITY PACKAGE_TYPE";

// Customer Listing
route.get('/list', (req, res, next)=>{
    var page = req.query.page || 1;
    
    const options = {
        select: selectVal,
        page: page,
        limit: 10,
    };

    Users.paginate({}, options).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

// Customer Filter By City
route.get('/filter/by/city/:city', (req, res, next)=>{
    var page = req.query.page || 1;
    var city = req.params.city;
    if(!city) res.status(500).json({message : 'Enter City !!'});
    const query = {
        CITY: { $regex: city, $options: 'i' }
    };
    const options = {
        select: selectVal,
        page: page,
        limit: 10,
    };
    Users.paginate(query, options).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

// Customer Filter By Package Type
route.get('/filter/by/package/:package', (req, res, next)=>{
    var page = req.query.page || 1;
    var package = req.params.package;

    if(!package) res.status(500).json({message : 'Enter Package !!'});
    
    const query = {
        PACKAGE_TYPE: {$regex: package, $options: 'i'}
    };
    const options = {
        select: selectVal,
        page: page,
        limit: 10,
    };
    Users.paginate(query, options).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

// All Cities and User Count
route.get('/all/city', (req, res, next)=>{
    const aggregate = [
        {
            $group: {
                _id: '$CITY',
                count: { $sum: 1 }
            }
        },{
            $sort: { count : -1 }
        }
    ];
    Users.aggregate(aggregate).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

// All Packages and User Count
route.get('/all/package', (req, res, next)=>{
    const aggregate = [
        {
            $group: {
                _id: '$PACKAGE_TYPE',
                count: { $sum: 1 }
            }
        },{
            $sort: { count : -1 }
        }
    ];
    Users.aggregate(aggregate).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

// Graph Data - 10 Cities Data with User Count 
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
            $limit : 11
        }
    ];
    Users.aggregate(aggregate).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

// Customer Detail
route.get('/detail/:id', (req, res, next)=>{
    var id = req.params.id;
    Users.findById(id).limit(10).then(docs=>{    
        res.status(200).json(docs);
    }).catch(err=>{throw err;});
})

// Network Topology
route.get('/network/topology', (req, res, next)=>{
    const aggregate = [
        {
            $group: {
                _id: '$CUSTOMER_NAME',
                _city : { 
                    $addToSet : '$CITY'
                },
                _data : {
                    $addToSet : { 
                        name : '$IZO_SDWAN_DEVICE_NAMES',
                        service_id : '$IZO_SDWAN_SRVC_ID',
                        customer_service_id : '$CUSTOMER_SERVICE_ID'
                    }
                } 
            }
        }
    ];
    Users.aggregate(aggregate).then(docs=>{
        var jsonDoc = [];
        docs.forEach(d => {
            var name = d._id;
            var cities = d._city;
            var child = d._data;
            if(name && cities){
                cities.forEach(c => {
                    if(c){
                        var data = { name : name, children : [ { name : c, children : child } ] };
                        jsonDoc.push(data);
                    }
                })
            }
        });
        res.status(200).json(jsonDoc);
    }).catch(err=>{throw err;});
})

// Network Topology As Per User
route.get('/network/topology/:name', (req, res, next)=>{
    var name = req.params.name;
    const aggregate = [
        {
            $match : { 'CUSTOMER_NAME': { $regex: name, $options: 'i'} }
        },
        {
            $group: {
                _id: '$CUSTOMER_NAME',
                _city : { 
                    $addToSet : '$CITY'
                },
                _data : {
                    $addToSet : { 
                        name : '$IZO_SDWAN_DEVICE_NAMES',
                        service_id : '$IZO_SDWAN_SRVC_ID',
                        customer_service_id : '$CUSTOMER_SERVICE_ID'
                    }
                } 
            }
        }
    ];
    Users.aggregate(aggregate).then(docs=>{
        var jsonDoc = [];
        docs.forEach(d => {
            var name = d._id;
            var cities = d._city;
            var child = d._data;
            if(name && cities){
                cities.forEach(c => {
                    if(c){
                        var data = { name : name, children : [ { name : c, children : child } ] };
                        jsonDoc.push(data);
                    }
                })
            }
        });
        res.status(200).json(jsonDoc);
    }).catch(err=>{throw err;});
})

module.exports = route;