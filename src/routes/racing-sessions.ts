import express from "express"
import {RacingSessionController} from "../controllers/RacingSessionController"

const router = express.Router()

router.post('/racing-sessions', RacingSessionController.create)
router.get('/racing-sessions/:id', RacingSessionController.getById)
router.get('/racing-sessions', RacingSessionController.getAll)
router.delete('/racing-sessions/:id', RacingSessionController.delete)
router.post('/racing-sessions/:racingSessionId/belongs-to-racing-event/:racingEventId', RacingSessionController.createBelongsToRacingEventRelation)
router.get('/racing-sessions/:racingSessionId/belongs-to-racing-event', RacingSessionController.getBelongsToRacingEventRelation)
router.delete('/racing-sessions/:racingSessionId/belongs-to-racing-event/:racingEventId', RacingSessionController.deleteBelongsToRacingEventRelation)
router.post('/racing-sessions/:racingSessionId/has-session-result/:sessionResultId', RacingSessionController.createHasSessionResultRelation)
router.get('/racing-sessions/:racingSessionId/has-session-result', RacingSessionController.getAllHasSessionResultRelations)
router.post('/racing-sessions/:racingSessionId/has-image/:imageId', RacingSessionController.createHasImageRelation)
router.get('/racing-sessions/:racingSessionId/has-image', RacingSessionController.getAllHasImageRelations)
router.delete('/racing-sessions/:racingSessionId/has-image/:imageId', RacingSessionController.deleteHasImageRelation)
router.post('/racing-sessions/:racingSessionId/has-prime-image/:imageId', RacingSessionController.createHasPrimeImageRelation)
router.get('/racing-sessions/:racingSessionId/has-prime-image', RacingSessionController.getHasPrimeImageRelation)
router.delete('/racing-sessions/:racingSessionId/has-prime-image/:imageId', RacingSessionController.deleteHasPrimeImageRelation)

export default router
