import express from "express"
import {TrackLayoutController} from "../controllers/TrackLayoutController"

const router = express.Router()

router.post('/track-layouts', TrackLayoutController.create)
router.get('/track-layouts/:id', TrackLayoutController.getById)

export default router
