import express from "express"
import {SessionResultController} from "../controllers/SessionResultController"

const router = express.Router()

router.post('/session-results', SessionResultController.create)
router.get('/session-results/:id', SessionResultController.getById)
router.get('/session-results', SessionResultController.getAll)
router.delete('/session-results/:id', SessionResultController.delete)
router.post('/session-results/:sessionResultId/belongs-to-racing-session/:racingSessionId', SessionResultController.createBelongsToRacingSessionRelation)
router.get('/session-results/:sessionResultId/belongs-to-racing-session', SessionResultController.getBelongsToRacingSessionRelation)
router.delete('/session-results/:sessionResultId/belongs-to-racing-session/:racingSessionId', SessionResultController.deleteBelongsToRacingSessionRelation)
router.post('/session-results/:sessionResultId/has-lap-time/:lapTimeId', SessionResultController.createHasLapTimeRelation)

export default router
