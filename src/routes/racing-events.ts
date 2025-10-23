import express from "express"
import {RacingEventController} from "../controllers/RacingEventController"

const router = express.Router()

router.post('/racing-events', RacingEventController.create)
router.get('/racing-events/:id', RacingEventController.getById)
router.get('/racing-events', RacingEventController.getAll)
router.delete('/racing-events/:id', RacingEventController.delete)
router.post('/racing-events/:racingEventId/belongs-to-racing-series/:racingSeriesId', RacingEventController.createBelongsToRacingSeriesRelation)
router.get('/racing-events/:racingEventId/belongs-to-racing-series', RacingEventController.getBelongsToRacingSeriesRelation)
router.delete('/racing-events/:racingEventId/belongs-to-racing-series/:racingSeriesId', RacingEventController.deleteBelongsToRacingSeriesRelation)
router.post('/racing-events/:racingEventId/is-followed-by-event/:partnerId', RacingEventController.createIsFollowedByEventRelation)
router.get('/racing-events/:racingEventId/is-followed-by-event', RacingEventController.getIsFollowedByEventRelation)
router.delete('/racing-events/:racingEventId/is-followed-by-event/:partnerId', RacingEventController.deleteIsFollowedByEventRelation)
router.post('/racing-events/:racingEventId/follows-event/:partnerId', RacingEventController.createFollowsEventRelation)
router.get('/racing-events/:racingEventId/follows-event', RacingEventController.getFollowsEventRelation)
router.delete('/racing-events/:racingEventId/follows-event/:partnerId', RacingEventController.deleteFollowsEventRelation)

export default router
