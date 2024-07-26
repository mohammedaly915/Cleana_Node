const Bin = require('../models/Bin');
const asyncWrapper = require('../middlewares/asyncWrapper');
const status=require("../utiles/status")
const appError=require("../utiles/errors")


const getAllBins = asyncWrapper(async (req, res) => {
    const query = req.query;
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;

    const bins = await Bin.find({}, { __v: false }).limit(limit).skip(skip);
    res.json({ status: 'SUCCESS', data: { bins } });
});

const addBin = asyncWrapper(async (req, res) => {
    const newBin = new Bin(req.body);
    await newBin.save();
    res.status(201).json({status:status.SUCCESS,bins:newBin});
});

const getBin =asyncWrapper(async(req,res,next)=>{
    const bin = await Bin.findById(req.params.id);
    if(!bin){
        const error = appError.create(" مش موجود سلة", 404, status.FAIL);
        return next(error);
    }
    res.status(200).json(bin);
})

const updateBin =asyncWrapper(async(req,res,next)=>{
    const id=req.params.id;
    const bin=await Bin.findById(id);
    if(!bin){
        return next(new Error("Bin not found"));
    }
        const updatedBin=await Bin.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        res.status(200).json({status:status.SUCCESS,bins:updatedBin});
})

const deleteBin = asyncWrapper(async (req, res) => {
    const deletedBin = await Bin.findByIdAndDelete(req.params.id);
    if (!deletedBin) return res.status(404).json({ message: 'Bin not found' });
    res.status(200).json({ message: 'Bin deleted successfully' });
});


const test =asyncWrapper(async (req,res,next)=>{
    console.log("scanned");
    return res.status(200).json({msg:"scanned" });

})



module.exports = {
    test,
    getBin,
    getAllBins,
    addBin,
    updateBin,
    deleteBin
    
};