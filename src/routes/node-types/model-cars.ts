import express from "express"
import {ModelCarController} from "../../controllers/node-types/ModelCarController"

const router = express.Router()

router.post('/model-cars', ModelCarController.create)
router.get('/model-cars/:id', ModelCarController.getById)
router.get('/model-cars', ModelCarController.getAll)
router.delete('/model-cars/:id', ModelCarController.delete)
router.post('/model-cars/:modelCarId/is-scale-model-of-car-model-variant/:carModelVariantId', ModelCarController.createIsScaleModelOfCarModelVariantRelation)
router.get('/model-cars/:modelCarId/is-scale-model-of-car-model-variant', ModelCarController.getIsScaleModelOfCarModelVariantRelation)
router.delete('/model-cars/:modelCarId/is-scale-model-of-car-model-variant/:carModelVariantId', ModelCarController.deleteIsScaleModelOfCarModelVariantRelation)
router.post('/model-cars/:modelCarId/made-by-model-car-brand/:modelCarBrandId', ModelCarController.createMadeByModelCarBrandRelation)
router.get('/model-cars/:modelCarId/made-by-model-car-brand', ModelCarController.getMadeByModelCarBrandRelation)
router.delete('/model-cars/:modelCarId/made-by-model-car-brand/:modelCarBrandId', ModelCarController.deleteMadeByModelCarBrandRelation)
router.post('/model-cars/:modelCarId/has-image/:imageId', ModelCarController.createHasImageRelation)
router.get('/model-cars/:modelCarId/has-image', ModelCarController.getAllHasImageRelations)
router.delete('/model-cars/:modelCarId/has-image/:imageId', ModelCarController.deleteHasImageRelation)
router.post('/model-cars/:modelCarId/has-prime-image/:imageId', ModelCarController.createHasPrimeImageRelation)
router.get('/model-cars/:modelCarId/has-prime-image', ModelCarController.getHasPrimeImageRelation)
router.delete('/model-cars/:modelCarId/has-prime-image/:imageId', ModelCarController.deleteHasPrimeImageRelation)

export default router
