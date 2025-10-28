import express from "express"
import {LapTimeController} from "../controllers/LapTimeController"

const router = express.Router()

router.post('/lap-times', LapTimeController.create)
router.get('/lap-times/:id', LapTimeController.getById)
router.get('/lap-times', LapTimeController.getAll)

export default router
