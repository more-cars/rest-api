import express from "express"
import {RaceTrackController} from "../../controllers/node-types/RaceTrackController"

const router = express.Router()

router.post('/race-tracks', RaceTrackController.create)
router.get('/race-tracks/:id', RaceTrackController.getById)
router.get('/race-tracks', RaceTrackController.getAll)
router.patch('/race-tracks/:id', RaceTrackController.update)
router.delete('/race-tracks/:id', RaceTrackController.delete)
router.post('/race-tracks/:raceTrackId/relationships/has-layout', RaceTrackController.createHasLayoutRelation)
router.get('/race-tracks/:raceTrackId/has-layout', RaceTrackController.getAllHasLayoutRelations)
router.delete('/race-tracks/:raceTrackId/relationships/has-layout', RaceTrackController.deleteHasLayoutRelation)
router.post('/race-tracks/:raceTrackId/relationships/hosted-racing-event', RaceTrackController.createHostedRacingEventRelation)
router.get('/race-tracks/:raceTrackId/hosted-racing-event', RaceTrackController.getAllHostedRacingEventRelations)
router.delete('/race-tracks/:raceTrackId/relationships/hosted-racing-event', RaceTrackController.deleteHostedRacingEventRelation)
router.post('/race-tracks/:raceTrackId/relationships/has-image', RaceTrackController.createHasImageRelation)
router.get('/race-tracks/:raceTrackId/has-image', RaceTrackController.getAllHasImageRelations)
router.delete('/race-tracks/:raceTrackId/relationships/has-image', RaceTrackController.deleteHasImageRelation)
router.post('/race-tracks/:raceTrackId/relationships/has-prime-image', RaceTrackController.createHasPrimeImageRelation)
router.get('/race-tracks/:raceTrackId/has-prime-image', RaceTrackController.getHasPrimeImageRelation)
router.delete('/race-tracks/:raceTrackId/relationships/has-prime-image', RaceTrackController.deleteHasPrimeImageRelation)
router.post('/race-tracks/:raceTrackId/relationships/has-video', RaceTrackController.createHasVideoRelation)
router.get('/race-tracks/:raceTrackId/has-video', RaceTrackController.getAllHasVideoRelations)
router.delete('/race-tracks/:raceTrackId/relationships/has-video', RaceTrackController.deleteHasVideoRelation)
router.post('/race-tracks/:raceTrackId/relationships/has-main-video', RaceTrackController.createHasMainVideoRelation)
router.get('/race-tracks/:raceTrackId/has-main-video', RaceTrackController.getHasMainVideoRelation)
router.delete('/race-tracks/:raceTrackId/relationships/has-main-video', RaceTrackController.deleteHasMainVideoRelation)

export default router
