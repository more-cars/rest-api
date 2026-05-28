import express from "express"
import {ModelCarBrandController} from "../../controllers/node-types/ModelCarBrandController"

const router = express.Router()

router.post('/model-car-brands', ModelCarBrandController.create)
router.get('/model-car-brands/:id', ModelCarBrandController.getById)
router.get('/model-car-brands', ModelCarBrandController.getAll)
router.patch('/model-car-brands/:id', ModelCarBrandController.update)
router.delete('/model-car-brands/:id', ModelCarBrandController.delete)
router.post('/model-car-brands/:modelCarBrandId/relationships/created-model-car', ModelCarBrandController.createCreatedModelCarRelation)
router.get('/model-car-brands/:modelCarBrandId/created-model-car', ModelCarBrandController.getAllCreatedModelCarRelations)
router.delete('/model-car-brands/:modelCarBrandId/relationships/created-model-car', ModelCarBrandController.deleteCreatedModelCarRelation)
router.post('/model-car-brands/:modelCarBrandId/relationships/has-image', ModelCarBrandController.createHasImageRelation)
router.get('/model-car-brands/:modelCarBrandId/has-image', ModelCarBrandController.getAllHasImageRelations)
router.delete('/model-car-brands/:modelCarBrandId/relationships/has-image', ModelCarBrandController.deleteHasImageRelation)
router.post('/model-car-brands/:modelCarBrandId/relationships/has-prime-image', ModelCarBrandController.createHasPrimeImageRelation)
router.get('/model-car-brands/:modelCarBrandId/has-prime-image', ModelCarBrandController.getHasPrimeImageRelation)
router.delete('/model-car-brands/:modelCarBrandId/relationships/has-prime-image', ModelCarBrandController.deleteHasPrimeImageRelation)
router.post('/model-car-brands/:modelCarBrandId/relationships/has-video', ModelCarBrandController.createHasVideoRelation)
router.get('/model-car-brands/:modelCarBrandId/has-video', ModelCarBrandController.getAllHasVideoRelations)
router.delete('/model-car-brands/:modelCarBrandId/relationships/has-video', ModelCarBrandController.deleteHasVideoRelation)
router.post('/model-car-brands/:modelCarBrandId/relationships/has-main-video', ModelCarBrandController.createHasMainVideoRelation)
router.get('/model-car-brands/:modelCarBrandId/has-main-video', ModelCarBrandController.getHasMainVideoRelation)
router.delete('/model-car-brands/:modelCarBrandId/relationships/has-main-video', ModelCarBrandController.deleteHasMainVideoRelation)

export default router
