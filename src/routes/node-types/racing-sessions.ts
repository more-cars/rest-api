import express from "express"
import {RacingSessionController} from "../../controllers/node-types/RacingSessionController"

const router = express.Router()

router.post('/racing-sessions', RacingSessionController.create)
router.get('/racing-sessions/:id', RacingSessionController.getById)
router.get('/racing-sessions', RacingSessionController.getAll)
router.patch('/racing-sessions/:id', RacingSessionController.update)
router.delete('/racing-sessions/:id', RacingSessionController.delete)
router.post('/racing-sessions/:racingSessionId/relationships/belongs-to-racing-event', RacingSessionController.createBelongsToRacingEventRelation)
router.get('/racing-sessions/:racingSessionId/belongs-to-racing-event', RacingSessionController.getBelongsToRacingEventRelation)
router.delete('/racing-sessions/:racingSessionId/relationships/belongs-to-racing-event', RacingSessionController.deleteBelongsToRacingEventRelation)
router.post('/racing-sessions/:racingSessionId/relationships/has-session-result', RacingSessionController.createHasSessionResultRelation)
router.get('/racing-sessions/:racingSessionId/has-session-result', RacingSessionController.getAllHasSessionResultRelations)
router.delete('/racing-sessions/:racingSessionId/relationships/has-session-result', RacingSessionController.deleteHasSessionResultRelation)
router.post('/racing-sessions/:racingSessionId/relationships/has-image', RacingSessionController.createHasImageRelation)
router.get('/racing-sessions/:racingSessionId/has-image', RacingSessionController.getAllHasImageRelations)
router.delete('/racing-sessions/:racingSessionId/relationships/has-image', RacingSessionController.deleteHasImageRelation)
router.post('/racing-sessions/:racingSessionId/relationships/has-prime-image', RacingSessionController.createHasPrimeImageRelation)
router.get('/racing-sessions/:racingSessionId/has-prime-image', RacingSessionController.getHasPrimeImageRelation)
router.delete('/racing-sessions/:racingSessionId/relationships/has-prime-image', RacingSessionController.deleteHasPrimeImageRelation)
router.post('/racing-sessions/:racingSessionId/relationships/has-video', RacingSessionController.createHasVideoRelation)
router.get('/racing-sessions/:racingSessionId/has-video', RacingSessionController.getAllHasVideoRelations)
router.delete('/racing-sessions/:racingSessionId/relationships/has-video', RacingSessionController.deleteHasVideoRelation)
router.post('/racing-sessions/:racingSessionId/relationships/has-main-video', RacingSessionController.createHasMainVideoRelation)
router.get('/racing-sessions/:racingSessionId/has-main-video', RacingSessionController.getHasMainVideoRelation)
router.delete('/racing-sessions/:racingSessionId/relationships/has-main-video', RacingSessionController.deleteHasMainVideoRelation)

export default router
