import express from "express"
import {LapTimeController} from "../controllers/node-types/LapTimeController"

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
router.post('/lap-times/:lapTimeId/achieved-with-car-model-variant/:carModelVariantId', LapTimeController.createAchievedWithCarModelVariantRelation)
router.get('/lap-times/:lapTimeId/achieved-with-car-model-variant', LapTimeController.getAchievedWithCarModelVariantRelation)
router.delete('/lap-times/:lapTimeId/achieved-with-car-model-variant/:carModelVariantId', LapTimeController.deleteAchievedWithCarModelVariantRelation)
router.post('/lap-times/:lapTimeId/has-image/:imageId', LapTimeController.createHasImageRelation)
router.get('/lap-times/:lapTimeId/has-image', LapTimeController.getAllHasImageRelations)
router.delete('/lap-times/:lapTimeId/has-image/:imageId', LapTimeController.deleteHasImageRelation)
router.post('/lap-times/:lapTimeId/has-prime-image/:imageId', LapTimeController.createHasPrimeImageRelation)
router.get('/lap-times/:lapTimeId/has-prime-image', LapTimeController.getHasPrimeImageRelation)
router.delete('/lap-times/:lapTimeId/has-prime-image/:imageId', LapTimeController.deleteHasPrimeImageRelation)

export default router
