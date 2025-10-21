import express from "express"
import {TrackLayoutController} from "../controllers/TrackLayoutController"

const router = express.Router()

router.post('/track-layouts', TrackLayoutController.create)
router.get('/track-layouts/:id', TrackLayoutController.getById)
router.get('/track-layouts', TrackLayoutController.getAll)
router.delete('/track-layouts/:id', TrackLayoutController.delete)
router.post('/track-layouts/:trackLayoutId/belongs-to-race-track/:raceTrackId', TrackLayoutController.createBelongsToRaceTrackRelation)

export default router
