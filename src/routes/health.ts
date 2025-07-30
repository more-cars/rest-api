import express from "express"
import {HealthController} from "../controllers/HealthController"

const router = express.Router()

router.get('/health', HealthController.health)

export default router
