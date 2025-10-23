import express from "express"
import {RacingSeriesController} from "../controllers/RacingSeriesController"

const router = express.Router()

router.post('/racing-series', RacingSeriesController.create)
router.get('/racing-series/:id', RacingSeriesController.getById)
router.get('/racing-series', RacingSeriesController.getAll)
router.delete('/racing-series/:id', RacingSeriesController.delete)
router.post('/racing-series/:racingSeriesId/has-racing-event/:racingEventId', RacingSeriesController.createHasRacingEventRelation)
router.get('/racing-series/:racingSeriesId/has-racing-event', RacingSeriesController.getAllHasRacingEventRelations)
router.delete('/racing-series/:racingSeriesId/has-racing-event/:racingEventId', RacingSeriesController.deleteHasRacingEventRelation)
router.post('/racing-series/:racingSeriesId/has-image/:imageId', RacingSeriesController.createHasImageRelation)
router.get('/racing-series/:racingSeriesId/has-image', RacingSeriesController.getAllHasImageRelations)
router.delete('/racing-series/:racingSeriesId/has-image/:imageId', RacingSeriesController.deleteHasImageRelation)
router.post('/racing-series/:racingSeriesId/has-prime-image/:imageId', RacingSeriesController.createHasPrimeImageRelation)

export default router
