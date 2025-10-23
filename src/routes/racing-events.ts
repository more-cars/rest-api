import express from "express"
import {RacingEventController} from "../controllers/RacingEventController"

const router = express.Router()

router.post('/racing-events', RacingEventController.create)
router.get('/racing-events/:id', RacingEventController.getById)
router.get('/racing-events', RacingEventController.getAll)
router.delete('/racing-events/:id', RacingEventController.delete)
router.post('/racing-events/:racingEventId/belongs-to-racing-series/:racingSeriesId', RacingEventController.createBelongsToRacingSeriesRelation)

export default router
