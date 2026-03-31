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
router.post('/model-cars/:modelCarId/has-video/:videoId', ModelCarController.createHasVideoRelation)
router.get('/model-cars/:modelCarId/has-video', ModelCarController.getAllHasVideoRelations)
router.delete('/model-cars/:modelCarId/has-video/:videoId', ModelCarController.deleteHasVideoRelation)
router.post('/model-cars/:modelCarId/has-main-video/:videoId', ModelCarController.createHasMainVideoRelation)
router.get('/model-cars/:modelCarId/has-main-video', ModelCarController.getHasMainVideoRelation)
router.delete('/model-cars/:modelCarId/has-main-video/:videoId', ModelCarController.deleteHasMainVideoRelation)

export default router
