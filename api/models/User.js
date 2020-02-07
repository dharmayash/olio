const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    customerName : String,
    // ADDRESS : String,
    // ADDRESS_B : String,
    // LOCATION : String,
    // CITY : String,
    // IZO_SDWAN_DEVICE_NAMES : String,
    // IZO_SDWAN_SRVC_ID : String,
    // CUSTOMER_SERVICE_ID : String,
    // SERVICE_TYPE : String,
    // CPE_INTERFACE : String,
    // PRODUCT_FLAVOUR : String,
    // CPE_FAILOVER : String,
    // PACKAGE_TYPE : String,
}) 


module.exports  = mongoose.model('User', userSchema);