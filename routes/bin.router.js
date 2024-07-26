const router = require('express').Router()
const BinController=require('../controllers/bin.controller')




router.route("/")
                .get(BinController.getAllBins)
                .post(BinController.addBin)
                 
router.route("/find/:id").get(BinController.getBin)
                         .patch(BinController.updateBin)
                         .delete(BinController.deleteBin)

module.exports = router;
 