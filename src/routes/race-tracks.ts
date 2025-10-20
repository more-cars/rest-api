import express from "express"
import {RaceTrackController} from "../controllers/RaceTrackController"

const router = express.Router()

router.post('/race-tracks', RaceTrackController.create)
router.get('/race-tracks/:id', RaceTrackController.getById)

export default router
