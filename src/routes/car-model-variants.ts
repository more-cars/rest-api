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

export default router
