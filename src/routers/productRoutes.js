import express from 'express'
import {createProduct, getProducts, updateProduct} from "../controllers/productController.js"

const router = express.Router()

router.post("/", createProduct);

router.get("/", getProducts);

router.patch("/:id", updateProduct)

export default router;