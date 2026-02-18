import express from "express"
import {SessionResultController} from "../../controllers/node-types/SessionResultController"

const router = express.Router()

router.post('/session-results', SessionResultController.create)
router.get('/session-results/:id', SessionResultController.getById)
router.get('/session-results', SessionResultController.getAll)
router.delete('/session-results/:id', SessionResultController.delete)
router.post('/session-results/:sessionResultId/belongs-to-racing-session/:racingSessionId', SessionResultController.createBelongsToRacingSessionRelation)
router.get('/session-results/:sessionResultId/belongs-to-racing-session', SessionResultController.getBelongsToRacingSessionRelation)
router.delete('/session-results/:sessionResultId/belongs-to-racing-session/:racingSessionId', SessionResultController.deleteBelongsToRacingSessionRelation)
router.post('/session-results/:sessionResultId/has-lap-time/:lapTimeId', SessionResultController.createHasLapTimeRelation)
router.get('/session-results/:sessionResultId/has-lap-time', SessionResultController.getAllHasLapTimeRelations)
router.delete('/session-results/:sessionResultId/has-lap-time/:lapTimeId', SessionResultController.deleteHasLapTimeRelation)
router.post('/session-results/:sessionResultId/achieved-with-car-model-variant/:carModelVariantId', SessionResultController.createAchievedWithCarModelVariantRelation)
router.get('/session-results/:sessionResultId/achieved-with-car-model-variant', SessionResultController.getAchievedWithCarModelVariantRelation)
router.delete('/session-results/:sessionResultId/achieved-with-car-model-variant/:carModelVariantId', SessionResultController.deleteAchievedWithCarModelVariantRelation)
router.post('/session-results/:sessionResultId/has-image/:imageId', SessionResultController.createHasImageRelation)
router.get('/session-results/:sessionResultId/has-image', SessionResultController.getAllHasImageRelations)
router.delete('/session-results/:sessionResultId/has-image/:imageId', SessionResultController.deleteHasImageRelation)
router.post('/session-results/:sessionResultId/has-prime-image/:imageId', SessionResultController.createHasPrimeImageRelation)
router.get('/session-results/:sessionResultId/has-prime-image', SessionResultController.getHasPrimeImageRelation)
router.delete('/session-results/:sessionResultId/has-prime-image/:imageId', SessionResultController.deleteHasPrimeImageRelation)

export default router
