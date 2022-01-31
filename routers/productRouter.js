const express = require('express');
const router = express.Router();


//import middleware


const {upload} = require('../middleware/filehelper')



const {checkLogin} = require('../middleware/checkLogin')

//import routers

const {postProduct,getAllProduct,specificProduct,updateProductInfo,deleteProduct} = require('../controllers/productController')

router.post('/postProduct', upload.array('files'),checkLogin, postProduct)

router.get('/getAllProduct', checkLogin, getAllProduct)

router.get('/specificProduct/:id', checkLogin, specificProduct)

router.put('/updateProductInfo/:id', checkLogin, updateProductInfo)

router.delete('/deleteProduct/:id', checkLogin, deleteProduct)

module.exports = router;