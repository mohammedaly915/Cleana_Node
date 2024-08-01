const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const verifyToken = require("../middlewares/verifyToken");

// Route to get all orders
router.route("/").get(verifyToken, orderController.getOrders)
                .post( verifyToken, orderController.createOrder)

// Route to get a specific order by ID
router.route("/:id").get(verifyToken, orderController.getOrder)
                    .patch(verifyToken, orderController.updateOrder)
                    .delete(verifyToken, orderController.deleteOrder);

module.exports = router;
