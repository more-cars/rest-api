import express from "express"
import {CarModelController} from "../controllers/CarModelController"

const router = express.Router()

router.post('/car-models', CarModelController.create)
router.get('/car-models/:id', CarModelController.getById)
router.get('/car-models', CarModelController.getAll)
router.delete('/car-models/:id', CarModelController.delete)
router.post('/car-models/:carModelId/belongs-to-brand/:brandId', CarModelController.createBelongsToBrandRelation)
router.get('/car-models/:carModelId/belongs-to-brand', CarModelController.getBelongsToBrandRelation)
router.post('/car-models/:carModelId/has-image/:imageId', CarModelController.createHasImageRelation)
router.get('/car-models/:carModelId/has-image/:imageId', CarModelController.getHasImageRelation)
router.get('/car-models/:carModelId/has-image', CarModelController.getHasImageRelations)

export default router
