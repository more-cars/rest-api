import express from "express"
import {RaceTrackController} from "../controllers/RaceTrackController"

const router = express.Router()

router.post('/race-tracks', RaceTrackController.create)
router.get('/race-tracks/:id', RaceTrackController.getById)
router.get('/race-tracks', RaceTrackController.getAll)
router.delete('/race-tracks/:id', RaceTrackController.delete)
router.post('/race-tracks/:raceTrackId/has-layout/:trackLayoutId', RaceTrackController.createHasLayoutRelation)
router.get('/race-tracks/:raceTrackId/has-layout', RaceTrackController.getAllHasLayoutRelations)

export default router
