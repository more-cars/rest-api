import express from "express"
import {RacingSessionController} from "../controllers/RacingSessionController"

const router = express.Router()

router.post('/racing-sessions', RacingSessionController.create)
router.get('/racing-sessions/:id', RacingSessionController.getById)
router.get('/racing-sessions', RacingSessionController.getAll)
router.delete('/racing-sessions/:id', RacingSessionController.delete)

export default router
