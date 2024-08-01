const router = require("express").Router();
const transactionController = require("../controllers/transaction.controller");
const verifyQRCode = require("../middlewares/verifyQrCode");
const verifyToken = require("../middlewares/verifyToken");

router.route("/").get(transactionController.getAllTransactions);

// Route for handling machine data and updating points
router.post("/machine-data", verifyQRCode,verifyToken, transactionController.handleMachineData);

module.exports = router;
