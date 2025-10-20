import express from "express"
import {RaceTrackController} from "../controllers/RaceTrackController"

const router = express.Router()

router.post('/race-tracks', RaceTrackController.create)
router.get('/race-tracks/:id', RaceTrackController.getById)
router.get('/race-tracks', RaceTrackController.getAll)
router.delete('/race-tracks/:id', RaceTrackController.delete)

export default router
