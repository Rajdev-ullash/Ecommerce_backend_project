const { check, validationResult } = require('express-validator');
const path = require('path');
const {unlink} = require('fs');
const User = require('../models/userAuth')
var createError = require('http-errors')

const addUserValidator = [
    check("name")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .trim(),

    check("email")
        .isEmail()
        .withMessage("Invalid Email Address")
        .trim()
        .custom(async(value)=>{
            try{
                const user = await User.findOne({ email: value})
                if(user){
                    throw createError("Email is already in use")
                }
            }
            catch(err){
                throw createError(err.message)
            }
        }),
    check("password")
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters and contain at least 1 lowercase, 1uppercase, 1number & 1symbol")
]


const addUserValidationHandler = function(req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if(Object.keys(mappedErrors).length === 0) {
        next();
    }
    else{
        // removed uploaded files
        const data = req.file.path
        if(data){
            // const data = req.file.path
            unlink(data, function(err){
                if (err){
                    console.log(err)
                }
            }
            );
        }

        //response the error

        res.status(500).json({
            errors: mappedErrors
        })
    }
}

module.exports ={addUserValidator,addUserValidationHandler}