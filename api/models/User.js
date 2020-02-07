const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = mongoose.Schema() 
userSchema.plugin(mongoosePaginate);

module.exports  = mongoose.model('User', userSchema);