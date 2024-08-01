const mongoose =require('mongoose')

const ProductSchema= new mongoose.Schema(
    {
        name: { type: String, required: true },
        image:{type:String,default:""},
        description: { type: String, required: true },
        company: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        count:{type:Number, default:0}
      },
      { timestamps: true }

)

module.exports= mongoose.model("product",ProductSchema)  