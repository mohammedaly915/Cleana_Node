const BinUser =require("../models/BinUser")
const User = require("../models/User");
const Bin = require("../models/Bin");
const appError=require("../utiles/errors")
const status=require('../utiles/status')
const asyncWrapper=require("../middlewares/asyncWrapper")

const getAllBinUsers = asyncWrapper(async (req, res) => {
    const binUsers = await BinUser.find();
    res.json({ status: status.SUCCESS, data: { binUsers } });
  });

const verifyQRCode = asyncWrapper(async (req, res, next) => {
    const { qrCode, userId } = req.body;
  
    const bin = await Bin.findOne({ qrCode });
    if (!bin) {
      const error = appError.create("Invalid QR Code", 400, status.FAIL);
      return next(error);
    }
  
    const user = await User.findById(userId);
    if (!user) {
      const error = appError.create("User not found", 404, status.FAIL);
      return next(error);
    }
  
    const binUser = new BinUser({ userId, binId: bin._id });
    await binUser.save();
  
    res.status(200).json({ status: status.SUCCESS, data: binUser });
  });

  // New method to receive data from the recycling bin machine
const receiveMachineData = asyncWrapper(async (req, res, next) => {
    const { qrCode, cans, bigBottle, smallBottle } = req.body;
  
    const bin = await Bin.findOne({ qrCode });
    if (!bin) {
      const error = appError.create("Invalid QR Code", 400, status.FAIL);
      return next(error);
    }
  
    const binUser = await BinUser.findOne({ binId: bin._id }).sort({ createdAt: -1 });
    if (!binUser) {
      const error = appError.create("No active bin user found", 404, status.FAIL);
      return next(error);
    }
  
    // Update the binUser with new items and calculate points
    binUser.cans += cans;
    binUser.bigBottle += bigBottle;
    binUser.smallBottle += smallBottle;
    binUser.points += (cans * 7) + (bigBottle * 4) + (smallBottle * 2);
  
    await binUser.save();
  
    // Update user's points
    const user = await User.findById(binUser.userId);
    user.points += (cans * 7) + (bigBottle * 4) + (smallBottle * 2);
    await user.save();
  
    res.status(200).json({ status: status.SUCCESS, data: binUser });
  });


  const updateBinUserPoints = asyncWrapper(async (req, res, next) => {
    const { binUserId, cans, bigBottle, smallBottle } = req.body;
  
    const binUser = await BinUser.findById(binUserId);
    if (!binUser) {
      const error = appError.create("BinUser not found", 404, status.FAIL);
      return next(error);
    }
  
    // Update the binUser with new items and calculate points
    binUser.cans += cans;
    binUser.bigBottle += bigBottle;
    binUser.smallBottle += smallBottle;
    binUser.points += (cans * 7) + (bigBottle * 4) + (smallBottle * 2);
  
    await binUser.save();
  
    // Update user's points
    const user = await User.findById(binUser.userId);
    user.points += (cans * 7) + (bigBottle * 4) + (smallBottle * 2);
    await user.save();
  
    // Send item type data to the embedded engineer's API
    const itemTypeData = { cans, bigBottle, smallBottle };
    await sendItemTypeData(itemTypeData);
  
    res.status(200).json({ status: status.SUCCESS, data: binUser });
  });
  

module.exports={
    getAllBinUsers,
    verifyQRCode,
    updateBinUserPoints,
    receiveMachineData

}