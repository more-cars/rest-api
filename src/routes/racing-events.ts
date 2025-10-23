import express from "express"
import {RacingEventController} from "../controllers/RacingEventController"

const router = express.Router()

router.post('/racing-events', RacingEventController.create)
router.get('/racing-events/:id', RacingEventController.getById)

export default router
