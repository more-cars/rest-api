import express from "express"
import {RaceTrackController} from "../controllers/RaceTrackController"

const router = express.Router()

router.post('/race-tracks', RaceTrackController.create)

export default router
