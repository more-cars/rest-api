import express from "express"
import {RacingEventController} from "../controllers/RacingEventController"

const router = express.Router()

router.post('/racing-events', RacingEventController.create)
router.get('/racing-events/:id', RacingEventController.getById)
router.get('/racing-events', RacingEventController.getAll)
router.delete('/racing-events/:id', RacingEventController.delete)

export default router
