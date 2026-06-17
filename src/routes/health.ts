import express from "express"
import {HealthController} from "../controllers/HealthController"

const router = express.Router()

router.get('/healthz', HealthController.healthz)
router.get('/ready', HealthController.ready)

export default router
