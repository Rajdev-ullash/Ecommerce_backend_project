const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');


const database = require('./config/db');
const { urlencoded } = require('body-parser');

require('dotenv').config();

const app = express();


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'))


//db connection

database();




//default error handler

const errorHandler = (err, req, res, next) => {
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({ error:err })
}

app.use(errorHandler)


const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

