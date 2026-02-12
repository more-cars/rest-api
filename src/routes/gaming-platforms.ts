import express from "express"
import {GamingPlatformController} from "../controllers/GamingPlatformController"

const router = express.Router()

router.post('/gaming-platforms', GamingPlatformController.create)
router.get('/gaming-platforms/:id', GamingPlatformController.getById)
router.get('/gaming-platforms', GamingPlatformController.getAll)

export default router
