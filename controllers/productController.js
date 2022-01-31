const Product = require('../models/product')

const { unlink } = require('fs');

// post product 


exports.postProduct = async (req, res) => {
    let filesArray = [];
    let filePath = [];
    req.files.forEach(element => {
        const file = {
            fileName: element.originalname,
            filePath: element.path
        }
        filesArray.push(file);
        filePath.push(file.filePath)


    })

    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: filesArray,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countOfStock: req.body.countOfStock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured

        })
        await product.save();
        res.status(200).json({
            message: "product uploaded successfully"
        })
    }
    catch (err) {
        const data = filePath.map(data => {

            if (data) {
                unlink(data, function (err) {
                    if (err) {
                        console.log(err)
                    }
                }
                );
            }
        })
        res.status(500).json({
            res: 'Product not uploaded',
            message: err.message
        })

    }

}


//get all products

exports.getAllProduct = async (req, res) => {
    try {
        const allProduct = await Product.find({})
        res.status(400).json({
            message: 'All product find successfully',
            result: allProduct
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'All product not found',
            error: err.message
        })
    }
}

//get specific product

exports.specificProduct = async (req, res) => {
    
    try {
        const specificProduct = await Product.findById({ _id: req.params.id });
        res.status(400).json({
            message: 'Product find successfully',
            result: specificProduct
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Product not found'
        })
    }
}


// update product

exports.updateProductInfo = async (req, res) => {
    let filesArray = [];
    let filePath = [];
    req.files.forEach(element => {
        const file = {
            fileName: element.originalname,
            filePath: element.path
        }
        filesArray.push(file);
        filePath.push(file.filePath)


    })
    try {
        const updateProductInfo = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: filesArray,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countOfStock: req.body.countOfStock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured
        }, { new: true })
        res.status(200).json({
            message: 'Information updated successfully',
            result: updateProductInfo
        })
    }
    catch (err) {
        const data = filePath.map(data => {

            if (data) {
                unlink(data, function (err) {
                    if (err) {
                        console.log(err)
                    }
                }
                );
            }
        })
        res.status(500).json({
            res: 'Product info not updated',
            message: err.message
        })
    }
}

//delete product


exports.deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete({ _id: req.params.id })

        res.status(200).json({
            message: 'Product deleted successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}