import express from "express"
import {RacingSessionController} from "../controllers/RacingSessionController"

const router = express.Router()

router.post('/racing-sessions', RacingSessionController.create)
router.get('/racing-sessions/:id', RacingSessionController.getById)

export default router
