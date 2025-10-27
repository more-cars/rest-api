import express from "express"
import {RacingSessionController} from "../controllers/RacingSessionController"

const router = express.Router()

router.post('/racing-sessions', RacingSessionController.create)

export default router
