import express from "express"
import {RacingSeriesController} from "../../controllers/node-types/RacingSeriesController"

const router = express.Router()

router.post('/racing-series', RacingSeriesController.create)
router.get('/racing-series/:id', RacingSeriesController.getById)
router.get('/racing-series', RacingSeriesController.getAll)
router.patch('/racing-series/:id', RacingSeriesController.update)
router.delete('/racing-series/:id', RacingSeriesController.delete)
router.post('/racing-series/:racingSeriesId/relationships/has-racing-event', RacingSeriesController.createHasRacingEventRelation)
router.get('/racing-series/:racingSeriesId/has-racing-event', RacingSeriesController.getAllHasRacingEventRelations)
router.delete('/racing-series/:racingSeriesId/relationships/has-racing-event', RacingSeriesController.deleteHasRacingEventRelation)
router.post('/racing-series/:racingSeriesId/relationships/has-image', RacingSeriesController.createHasImageRelation)
router.get('/racing-series/:racingSeriesId/has-image', RacingSeriesController.getAllHasImageRelations)
router.delete('/racing-series/:racingSeriesId/relationships/has-image', RacingSeriesController.deleteHasImageRelation)
router.post('/racing-series/:racingSeriesId/relationships/has-prime-image', RacingSeriesController.createHasPrimeImageRelation)
router.get('/racing-series/:racingSeriesId/has-prime-image', RacingSeriesController.getHasPrimeImageRelation)
router.delete('/racing-series/:racingSeriesId/relationships/has-prime-image', RacingSeriesController.deleteHasPrimeImageRelation)
router.post('/racing-series/:racingSeriesId/relationships/has-video', RacingSeriesController.createHasVideoRelation)
router.get('/racing-series/:racingSeriesId/has-video', RacingSeriesController.getAllHasVideoRelations)
router.delete('/racing-series/:racingSeriesId/relationships/has-video', RacingSeriesController.deleteHasVideoRelation)
router.post('/racing-series/:racingSeriesId/relationships/has-main-video', RacingSeriesController.createHasMainVideoRelation)
router.get('/racing-series/:racingSeriesId/has-main-video', RacingSeriesController.getHasMainVideoRelation)
router.delete('/racing-series/:racingSeriesId/relationships/has-main-video', RacingSeriesController.deleteHasMainVideoRelation)

export default router
