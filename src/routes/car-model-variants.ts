import express from "express"
import {CarModelVariantController} from "../controllers/CarModelVariantController"

const router = express.Router()

router.post('/car-model-variants', CarModelVariantController.create)
router.get('/car-model-variants/:id', CarModelVariantController.getById)
router.get('/car-model-variants', CarModelVariantController.getAll)
router.delete('/car-model-variants/:id', CarModelVariantController.delete)
router.post('/car-model-variants/:carModelVariantId/is-variant-of/:carModelId', CarModelVariantController.createIsVariantOfRelation)
router.get('/car-model-variants/:carModelVariantId/is-variant-of', CarModelVariantController.getIsVariantOfRelation)
router.delete('/car-model-variants/:carModelVariantId/is-variant-of/:carModelId', CarModelVariantController.deleteIsVariantOfRelation)
router.post('/car-model-variants/:carModelVariantId/achieved-session-result/:sessionResultId', CarModelVariantController.createAchievedSessionResultRelation)
router.get('/car-model-variants/:carModelVariantId/achieved-session-result', CarModelVariantController.getAllAchievedSessionResultRelations)
router.delete('/car-model-variants/:carModelVariantId/achieved-session-result/:sessionResultId', CarModelVariantController.deleteAchievedSessionResultRelation)
router.post('/car-model-variants/:carModelVariantId/achieved-lap-time/:lapTimeId', CarModelVariantController.createAchievedLapTimeRelation)
router.get('/car-model-variants/:carModelVariantId/achieved-lap-time', CarModelVariantController.getAllAchievedLapTimeRelations)
router.delete('/car-model-variants/:carModelVariantId/achieved-lap-time/:lapTimeId', CarModelVariantController.deleteAchievedLapTimeRelation)
router.post('/car-model-variants/:carModelVariantId/has-image/:imageId', CarModelVariantController.createHasImageRelation)
router.get('/car-model-variants/:carModelVariantId/has-image', CarModelVariantController.getAllHasImageRelations)
router.delete('/car-model-variants/:carModelVariantId/has-image/:imageId', CarModelVariantController.deleteHasImageRelation)
router.post('/car-model-variants/:carModelVariantId/has-prime-image/:imageId', CarModelVariantController.createHasPrimeImageRelation)
router.get('/car-model-variants/:carModelVariantId/has-prime-image', CarModelVariantController.getHasPrimeImageRelation)
router.delete('/car-model-variants/:carModelVariantId/has-prime-image/:imageId', CarModelVariantController.deleteHasPrimeImageRelation)

export default router
