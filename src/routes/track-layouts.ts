import express from "express"
import {TrackLayoutController} from "../controllers/TrackLayoutController"

const router = express.Router()

router.post('/track-layouts', TrackLayoutController.create)

export default router
