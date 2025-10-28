import express from "express"
import {LapTimeController} from "../controllers/LapTimeController"

const router = express.Router()

router.post('/lap-times', LapTimeController.create)

export default router
