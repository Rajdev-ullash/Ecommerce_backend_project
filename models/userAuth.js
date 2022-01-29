const mongoose = require('mongoose')



const userAuthSchema = new mongoose.Schema({
    name:{
        type:'String',
        required:true,
        trim:true,
    },
    email:{
        type:'String',
        required:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:'String',
        required:true,
    },
    avatar:{
        type:'String',
    }
},{timestamps:true})

module.exports = mongoose.model('UserAuth', userAuthSchema);