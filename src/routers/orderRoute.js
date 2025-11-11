import express from 'express'
import * as orderConntroller from '../controllers/orderController.js'

const router = express.Router()

router.post("/", orderConntroller.createOrder);

router.get("/", orderConntroller.getOrders);

router.put("/:id/status", orderConntroller.updateStatus)

export default router;