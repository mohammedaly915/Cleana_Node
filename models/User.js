const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    phone: { type:Number, default: null },
    password: { type: String, required: true },
    userPic: { type: String, default: "https://img.freepik.com/free-psd/3d-rendering-boy-avatar-emoji_23-2150603381.jpg?t=st=1720053065~exp=1720056665~hmac=0b6e658052e7c5767f5aca64fecb24b34abd5576edac75c99ddc1ecf49321109&w=740" },
    userCountry: { type:mongoose.Schema.Types.ObjectId,ref:'country', default: null },
    userCity: {type: mongoose.Schema.Types.ObjectId,ref: 'city',default: null},
    userAddress: { type:String, default: null },
    buildingNo: { type:Number, default: null },
    Gender: { type:String,required: true, default: null },
    Points: { type:Number, default: null },
    isAdmin: { type: Boolean, default: false },
  },
  {timestamps:true} 
)

module.exports= mongoose.model("user",UserSchema)