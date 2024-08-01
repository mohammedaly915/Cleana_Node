const router =require('express').Router()
const productController = require("../controllers/product.controller")
const verifyToken =require("../middlewares/verifyToken")

router.route("/").get(productController.getAllProducts)
router.route("/").post(productController.addProduct)
              
              
router.route("/:id").get(productController.getProduct)
                    .patch(productController.updateProduct)
                    .delete(productController.deleteProduct)

module.exports =router;