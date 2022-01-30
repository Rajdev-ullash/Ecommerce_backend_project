const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/UserAuth')


const { fileSizeFormatter } = require('../utils/fileSizeFormatter')



exports.signup = async (req, res) => {
    try {

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            avatar: req.file.originalname
        });

        // User.regis
        await newUser.save();
        res.status(200).json({
            newUser,
            message: 'signup successfully',
        });


    } catch (error) {
        res.status(500).json({
            message: 'signup error find!!!',
            err: error.message
        });
    }
}


exports.login = async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email })

        //user found check

        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password)

            // if password is correct

            if (isValidPassword) {
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },process.env.JWT_SECRET
                );
                res.status(200).json({
                    token: token,
                    message: 'Login successfully',
                    data: user[0]
                })
            }
            else {
                res.status(401).json({
                    error: 'password invalid',
                });
            }
        }
        else {
            res.status(401).json({
                error: 'authentication failed',
            });
        }
    }
    catch (err) {
        res.status(401).json({
            error: 'authentication failed',
        });
    }
}


//get all user

exports.getAllUser = async (req, res) => {
    try {

        const allUser = await User.find({})
        res.status(400).json({
            message: 'All user find successfully',
            result: allUser
        })

    }
    catch (err) {
        res.status(500).json({
            message: 'User not found',
            error: err.message
        })
    }
}

//get specific user

exports.specificUser = async (req, res) => {
    try {
        const specificUser = await User.findById({ _id: req.params.id });
        res.status(400).json({
            message: 'user find successfully',
            result: specificUser
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'User not found'
        })
    }
}

//update user data

exports.updateUserInfo = async (req, res) => {
    try {
        const updateUserInfo = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            avatar: req.file.originalname
        }, { new: true })
        res.status(200).json({
            message: 'Information updated successfully',
            result: updateUserInfo
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}

// delete user

exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete({ _id: req.params.id })

        res.status(200).json({
            message: 'User deleted successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}


//try file upload

exports.singleFileUpload = async (req, res) => {
    try {
        const file = {
            filename: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 3)
        }
        console.log(file)
        res.status(200).json({
            message: 'File uploaded successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

