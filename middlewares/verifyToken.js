
const jwt=require("jsonwebtoken")
const status=require('../utiles/status')
const appError=require('../utiles/errors')
 
const verifyToken=(req,res,next)=>{
    const authToken=req.headers["authorization"]||req.header["Authorization"]
    
    if(!authToken){
        const error=appError.create("token is required",401,status.FAIL)
        return next(error)
    }
    
    try{
        const currentUSer=jwt.verify(authToken,process.env.JWT_SECRET_KEY)
        req.currentUSer=currentUSer;
        next()
    }catch(err){
        const error=appError.create("invalid token",401,status.ERROR)
        next(error)    
    
    }
}
module.exports=verifyToken;