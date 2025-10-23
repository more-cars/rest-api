import express from "express"
import {RacingEventController} from "../controllers/RacingEventController"

const router = express.Router()

router.post('/racing-events', RacingEventController.create)
router.get('/racing-events/:id', RacingEventController.getById)
router.get('/racing-events', RacingEventController.getAll)

export default router
