const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const userAuthSchema = new mongoose.Schema({
    name:{
        type:'String',
        required:true
    },
    email:{
        type:'String',
        required:true
    },
    password:{
        type:'String',
        required:true,
    },
    avatar:{
        type:'String',
    }
},{timestamps:true})

module.exports =mongoose.models.User || mongoose.model('User', userAuthSchema);