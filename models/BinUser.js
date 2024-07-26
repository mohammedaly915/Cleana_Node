const mongoose=require("mongoose")

const BinUserSchema=new mongoose.Schema(
    {
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    binId:{type:mongoose.Schema.Types.ObjectId,ref:'bin',required:true},
    can:{type:Number,default:0},
    bigBottle:{type:Number,default:0},
    smallBottle:{type:Number,default:0},
    materialValue: { type: Number, default: 0 },
    points:{type:Number,default:0}
    
},
{timestamps:true})
module.exports= mongoose.model("binuser",BinSchema)  