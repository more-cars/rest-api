import express from "express"
import {TrackLayoutController} from "../controllers/TrackLayoutController"

const router = express.Router()

router.post('/track-layouts', TrackLayoutController.create)
router.get('/track-layouts/:id', TrackLayoutController.getById)
router.get('/track-layouts', TrackLayoutController.getAll)
router.delete('/track-layouts/:id', TrackLayoutController.delete)
router.post('/track-layouts/:trackLayoutId/belongs-to-race-track/:raceTrackId', TrackLayoutController.createBelongsToRaceTrackRelation)
router.get('/track-layouts/:trackLayoutId/belongs-to-race-track', TrackLayoutController.getBelongsToRaceTrackRelation)
router.delete('/track-layouts/:trackLayoutId/belongs-to-race-track/:raceTrackId', TrackLayoutController.deleteBelongsToRaceTrackRelation)
router.post('/track-layouts/:trackLayoutId/has-image/:imageId', TrackLayoutController.createHasImageRelation)
router.get('/track-layouts/:trackLayoutId/has-image', TrackLayoutController.getAllHasImageRelations)
router.delete('/track-layouts/:trackLayoutId/has-image/:imageId', TrackLayoutController.deleteHasImageRelation)
router.post('/track-layouts/:trackLayoutId/has-prime-image/:imageId', TrackLayoutController.createHasPrimeImageRelation)

export default router
