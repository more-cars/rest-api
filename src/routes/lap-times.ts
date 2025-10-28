import express from "express"
import {LapTimeController} from "../controllers/LapTimeController"

const router = express.Router()

router.post('/lap-times', LapTimeController.create)
router.get('/lap-times/:id', LapTimeController.getById)
router.get('/lap-times', LapTimeController.getAll)
router.delete('/lap-times/:id', LapTimeController.delete)
router.post('/lap-times/:lapTimeId/belongs-to-session-result/:sessionResultId', LapTimeController.createBelongsToSessionResultRelation)
router.get('/lap-times/:lapTimeId/belongs-to-session-result', LapTimeController.getBelongsToSessionResultRelation)
router.delete('/lap-times/:lapTimeId/belongs-to-session-result/:sessionResultId', LapTimeController.deleteBelongsToSessionResultRelation)
router.post('/lap-times/:lapTimeId/achieved-on-track-layout/:trackLayoutId', LapTimeController.createAchievedOnTrackLayoutRelation)
router.get('/lap-times/:lapTimeId/achieved-on-track-layout', LapTimeController.getAchievedOnTrackLayoutRelation)
router.delete('/lap-times/:lapTimeId/achieved-on-track-layout/:trackLayoutId', LapTimeController.deleteAchievedOnTrackLayoutRelation)

export default router
