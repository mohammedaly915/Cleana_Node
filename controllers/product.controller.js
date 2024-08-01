const Product = require("../models/Product")
const Category = require("../models/Category")
const User = require("../models/User")

const appError=require("../utiles/errors")
const status=require('../utiles/status')
const asyncWrapper=require('../middlewares/asyncWrapper')

const getAllProducts = asyncWrapper(async(req,res,next)=>{
    const products = await Product.find()
    res.json({status:status.SUCCESS,products})
})
const getProduct = asyncWrapper(async(req,res,next)=>{
    const id=req.params.id;
    const product = await Product.findById(id)
    if(!product){
        const error = appError.create("مش موجود اي منتج",404,status.FAIL)
        return next(error)
    }
    res.json({status:status.SUCCESS,product})


})
const addProduct =asyncWrapper(async(req,res,next)=>{
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.json({status:status.SUCCESS,newProduct})

})

const updateProduct=asyncWrapper(async(req,res,next)=>{
    try{
        const updatedProduct=await Product.updateOne(
            {_id:req.params.id},
            {$set:{...req.body}})
        return res.status(201).json({ status: status.SUCCESS, data: { updatedProduct } });
    }catch{
        const error = appError.create("Fauled Update",400,status.ERROR)
        next(error)
    }
    
})

const deleteProduct = asyncWrapper(async(req,res,next)=>{
    try{
        await Product.deleteOne({_id:req.params.id})
        res.status(200).json({ status: status.SUCCESS, msg:"Product deleted" });
    }catch{
        const error = appError.create("Failed Deleted",400,status.ERROR)
        next(error)
    }
})


module.exports={
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}