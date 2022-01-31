const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
    name:{
        type: 'String',
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    richDescription:{
        type: String,
        required: true,
    },
    image:[Object],
    brand:{
        type: String,  
    },
    price:{
        type:Number,
        required: true,
        default: 0,
    },
    category:{
        type:String,
        enum: ['Tech', 'Manufact', 'Electronic'],
        default: 'Tech',
    },
    countOfStock:{
        type:String,
        required: true,
        min: 0,
        max: 200,
    },
    rating:{
        type:Number,
        
    },
    isFeatured:{
        type:Boolean
    }

},{timestamps:true})

module.exports =mongoose.models.Product || mongoose.model('Product', productSchema);