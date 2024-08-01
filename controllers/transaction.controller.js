const Transaction =require("../models/Transaction")
const User = require("../models/User");
const Bin = require("../models/Bin");
const appError=require("../utiles/errors")
const status=require('../utiles/status')
const asyncWrapper=require("../middlewares/asyncWrapper")

const getAllTransactions = asyncWrapper(async (req, res) => {
    const transactions = await Transaction.find();
    res.json({ status: status.SUCCESS, data: { transactions } });
});


const handleMachineData = asyncWrapper(async (req, res, next) => {
    const { cans, bigBottle, smallBottle } = req.body;
    const bin = req.bin; 
    const currentUser = req.user;
    console.log(cans);
    console.log(bigBottle);
    const points = (cans * 7 || 0) + (bigBottle * 4 || 0) + (smallBottle * 2 || 0);
    
    // Create a new transaction
    const transaction = new Transaction({
        userId:currentUser.id,
        binId: bin._id,
        cans,
        bigBottle, 
        smallBottle,
        points
    });

    await transaction.save();

    // Update user's points
    const user = await User.findById(transaction.userId);
    user.Points =user.Points + points;
    await user.save();

    res.status(200).json({ status: status.SUCCESS, data: transaction });
});



  

module.exports={
    getAllTransactions,
    handleMachineData

}