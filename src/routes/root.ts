import express from "express"
import {RootController} from "../controllers/RootController"

const router = express.Router()

router.get('/', RootController.root)

export default router
