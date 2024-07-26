
const User=require("../models/User")
const status=require("../utiles/status")
const appError=require('../utiles/errors');
const asyncWrapper = require("../middlewares/asyncWrapper");
const bcrypt=require("bcryptjs")

// Get All user
const getUsers= asyncWrapper(async(req,res)=>{
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const users = await User.find({}, { __v: false,password:false }).limit(limit).skip(skip);
    res.json({ status: status.SUCCESS, data: { users } }); 
})



// get one user 
const getUser=asyncWrapper(async(req,res,next)=>{    
        const user = await User.findById(req.params.id);
        if(!user){
            const error = appError.create("NOT FOUND", 404, status.FAIL);
            return next(error);
        }
        const { password,__v, ...info } = user._doc;
        res.status(200).json(info);
    })

// Update user
const updateUser=asyncWrapper(async(req,res,next)=>{
    
    if (req.body.password){
        req.body.password=await bcrypt.hash(req.body.password, 10);
        
    }
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      { $set: {...req.body } }
    );
    console.log(getUser);
    return res
      .status(201) 
      .json({ status: status.SUCCESS, message:"Updated done" });
  
  })

// delete user
const deleteUser=asyncWrapper(async(req,res)=>{
    await User.deleteOne({email:req.params.email});
    res.status(201).json({status:status.SUCCESS ,message:"User has been deleted..."})

})

module.exports={
    getUsers,
    getUser,
    updateUser,
    deleteUser
}