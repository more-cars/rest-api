import express from "express"
import {RacingGameController} from "../controllers/RacingGameController"

const router = express.Router()

router.post('/racing-games', RacingGameController.create)

export default router
