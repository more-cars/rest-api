import express from "express"
import {RacingSeriesController} from "../controllers/RacingSeriesController"

const router = express.Router()

router.post('/racing-series', RacingSeriesController.create)

export default router
