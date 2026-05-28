import express from "express"
import {ModelCarController} from "../../controllers/node-types/ModelCarController"

const router = express.Router()

router.post('/model-cars', ModelCarController.create)
router.get('/model-cars/:id', ModelCarController.getById)
router.get('/model-cars', ModelCarController.getAll)
router.patch('/model-cars/:id', ModelCarController.update)
router.delete('/model-cars/:id', ModelCarController.delete)
router.post('/model-cars/:modelCarId/relationships/is-scale-model-of-car-model-variant', ModelCarController.createIsScaleModelOfCarModelVariantRelation)
router.get('/model-cars/:modelCarId/is-scale-model-of-car-model-variant', ModelCarController.getIsScaleModelOfCarModelVariantRelation)
router.delete('/model-cars/:modelCarId/relationships/is-scale-model-of-car-model-variant', ModelCarController.deleteIsScaleModelOfCarModelVariantRelation)
router.post('/model-cars/:modelCarId/relationships/made-by-model-car-brand', ModelCarController.createMadeByModelCarBrandRelation)
router.get('/model-cars/:modelCarId/made-by-model-car-brand', ModelCarController.getMadeByModelCarBrandRelation)
router.delete('/model-cars/:modelCarId/relationships/made-by-model-car-brand', ModelCarController.deleteMadeByModelCarBrandRelation)
router.post('/model-cars/:modelCarId/relationships/has-image', ModelCarController.createHasImageRelation)
router.get('/model-cars/:modelCarId/has-image', ModelCarController.getAllHasImageRelations)
router.delete('/model-cars/:modelCarId/relationships/has-image', ModelCarController.deleteHasImageRelation)
router.post('/model-cars/:modelCarId/relationships/has-prime-image', ModelCarController.createHasPrimeImageRelation)
router.get('/model-cars/:modelCarId/has-prime-image', ModelCarController.getHasPrimeImageRelation)
router.delete('/model-cars/:modelCarId/relationships/has-prime-image', ModelCarController.deleteHasPrimeImageRelation)
router.post('/model-cars/:modelCarId/relationships/has-video', ModelCarController.createHasVideoRelation)
router.get('/model-cars/:modelCarId/has-video', ModelCarController.getAllHasVideoRelations)
router.delete('/model-cars/:modelCarId/relationships/has-video', ModelCarController.deleteHasVideoRelation)
router.post('/model-cars/:modelCarId/relationships/has-main-video', ModelCarController.createHasMainVideoRelation)
router.get('/model-cars/:modelCarId/has-main-video', ModelCarController.getHasMainVideoRelation)
router.delete('/model-cars/:modelCarId/relationships/has-main-video', ModelCarController.deleteHasMainVideoRelation)

export default router
