import express from "express"
import {SessionResultController} from "../../controllers/node-types/SessionResultController"

const router = express.Router()

router.post('/session-results', SessionResultController.create)
router.get('/session-results/:id', SessionResultController.getById)
router.get('/session-results', SessionResultController.getAll)
router.patch('/session-results/:id', SessionResultController.update)
router.delete('/session-results/:id', SessionResultController.delete)
router.post('/session-results/:sessionResultId/relationships/belongs-to-racing-session', SessionResultController.createBelongsToRacingSessionRelation)
router.get('/session-results/:sessionResultId/belongs-to-racing-session', SessionResultController.getBelongsToRacingSessionRelation)
router.delete('/session-results/:sessionResultId/relationships/belongs-to-racing-session', SessionResultController.deleteBelongsToRacingSessionRelation)
router.post('/session-results/:sessionResultId/relationships/has-lap-time', SessionResultController.createHasLapTimeRelation)
router.get('/session-results/:sessionResultId/has-lap-time', SessionResultController.getAllHasLapTimeRelations)
router.delete('/session-results/:sessionResultId/relationships/has-lap-time', SessionResultController.deleteHasLapTimeRelation)
router.post('/session-results/:sessionResultId/relationships/achieved-with-car-model-variant', SessionResultController.createAchievedWithCarModelVariantRelation)
router.get('/session-results/:sessionResultId/achieved-with-car-model-variant', SessionResultController.getAchievedWithCarModelVariantRelation)
router.delete('/session-results/:sessionResultId/relationships/achieved-with-car-model-variant', SessionResultController.deleteAchievedWithCarModelVariantRelation)
router.post('/session-results/:sessionResultId/relationships/has-image', SessionResultController.createHasImageRelation)
router.get('/session-results/:sessionResultId/has-image', SessionResultController.getAllHasImageRelations)
router.delete('/session-results/:sessionResultId/relationships/has-image', SessionResultController.deleteHasImageRelation)
router.post('/session-results/:sessionResultId/relationships/has-prime-image', SessionResultController.createHasPrimeImageRelation)
router.get('/session-results/:sessionResultId/has-prime-image', SessionResultController.getHasPrimeImageRelation)
router.delete('/session-results/:sessionResultId/relationships/has-prime-image', SessionResultController.deleteHasPrimeImageRelation)

export default router
