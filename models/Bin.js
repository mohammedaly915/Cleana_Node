const mongoose=require("mongoose")

const BinSchema=new mongoose.Schema(
    {
    can:{type:Number,default:0},
    bigBottle:{type:Number,default:0},
    smallBottle:{type:Number,default:0},
    materialValue: { type: Number, default: 0 },
    location:{type:String,default:0},
    
    
},
{timestamps:true})
module.exports= mongoose.model("bin",BinSchema)  