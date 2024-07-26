const router = require("express").Router();
const binUserController=require("../controllers/binUser.controller")


router.route("/").get(binUserController)
                .post()

// Route for verifying QR code
router.post("/verify-qr", binUserController.verifyQRCode);

// Route for updating binUser points and sending item type data
router.patch("/update-points", binUserController.updateBinUserPoints);

// New route for receiving data from the recycling bin machine
router.post("/machine-data", binUserController.receiveMachineData);


module.exports = router;
