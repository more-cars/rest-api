import express from "express"
import {RacingSeriesController} from "../controllers/RacingSeriesController"

const router = express.Router()

router.post('/racing-series', RacingSeriesController.create)
router.get('/racing-series/:id', RacingSeriesController.getById)
router.get('/racing-series', RacingSeriesController.getAll)
router.delete('/racing-series/:id', RacingSeriesController.delete)

export default router
