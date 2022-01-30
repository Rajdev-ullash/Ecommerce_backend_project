const express = require('express');
const router = express.Router();





//import middleware


const {upload} = require('../middleware/filehelper')

const {addUserValidator,addUserValidationHandler} = require('../middleware/userAuthValidator')

const {checkLogin} = require('../middleware/checkLogin')


//import controllers

const {signup, login, getAllUser, specificUser, updateUserInfo, deleteUser, singleFileUpload} = require('../controllers/userAuthController')




//route

router.post('/signup', upload.single('file'),addUserValidator,addUserValidationHandler, signup)
router.post(`/login`, login)
router.get(`/getAllUser`, checkLogin, getAllUser)
router.get(`/user/:id`, checkLogin, specificUser)
router.put(`/updateInfo/:id`, checkLogin, updateUserInfo)
router.delete(`/deleteUser`, checkLogin, deleteUser)

router.post('/singleFileUpload', upload.single('file'), singleFileUpload)






module.exports = router;