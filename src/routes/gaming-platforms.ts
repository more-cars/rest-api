import express from "express"
import {GamingPlatformController} from "../controllers/GamingPlatformController"

const router = express.Router()

router.post('/gaming-platforms', GamingPlatformController.create)

export default router
