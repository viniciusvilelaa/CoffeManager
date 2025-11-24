import * as userController from "../controllers/userController.js"
import express from 'express'

const router = express.Router();

router.get("/", userController.getUsers);

router.post("/", userController.createUser);

export default router;