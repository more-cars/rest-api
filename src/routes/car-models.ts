import express from "express"
import {CarModelController} from "../controllers/CarModelController"

const router = express.Router()

router.post('/car-models', CarModelController.create)
router.get('/car-models/:id', CarModelController.getById)
router.get('/car-models', CarModelController.getAll)
router.delete('/car-models/:id', CarModelController.delete)
router.post('/car-models/:carModelId/belongs-to-brand/:brandId', CarModelController.createBelongsToBrandRelation)
router.get('/car-models/:carModelId/belongs-to-brand', CarModelController.getBelongsToBrandRelation)
router.delete('/car-models/:carModelId/belongs-to-brand/:brandId', CarModelController.deleteBelongsToBrandRelation)
router.post('/car-models/:carModelId/has-successor/:relationPartnerId', CarModelController.createHasSuccessorRelation)
router.get('/car-models/:carModelId/has-successor', CarModelController.getHasSuccessorRelation)
router.delete('/car-models/:carModelId/has-successor/:partnerId', CarModelController.deleteHasSuccessorRelation)
router.post('/car-models/:carModelId/is-successor-of/:partnerId', CarModelController.createIsSuccessorOfRelation)
router.get('/car-models/:carModelId/is-successor-of', CarModelController.getIsSuccessorOfRelation)
router.delete('/car-models/:carModelId/is-successor-of/:partnerId', CarModelController.deleteIsSuccessorOfRelation)
router.post('/car-models/:carModelId/has-image/:imageId', CarModelController.createHasImageRelation)
router.get('/car-models/:carModelId/has-image/:imageId', CarModelController.getSpecificHasImageRelation)
router.get('/car-models/:carModelId/has-image', CarModelController.getAllHasImageRelations)
router.delete('/car-models/:carModelId/has-image/:imageId', CarModelController.deleteHasImageRelation)
router.post('/car-models/:carModelId/has-prime-image/:imageId', CarModelController.createHasPrimeImageRelation)
router.get('/car-models/:carModelId/has-prime-image', CarModelController.getHasPrimeImageRelation)
router.get('/car-models/:carModelId/has-prime-image/:imageId', CarModelController.getSpecificHasPrimeImageRelation)
router.delete('/car-models/:carModelId/has-prime-image/:imageId', CarModelController.deleteHasPrimeImageRelation)

export default router
