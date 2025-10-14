import express from "express"
import {BrandController} from "../controllers/BrandController"

const router = express.Router()

router.post('/brands', BrandController.create)
router.get('/brands/:id', BrandController.getById)
router.get('/brands', BrandController.getAll)
router.delete('/brands/:id', BrandController.delete)
router.post('/brands/:brandId/has-car-model/:carModelId', BrandController.createHasCarModelRelation)
router.get('/brands/:brandId/has-car-model/:carModelId', BrandController.getSpecificHasCarModelRelation)
router.get('/brands/:brandId/has-car-model', BrandController.getAllHasCarModelRelations)
router.delete('/brands/:brandId/has-car-model/:carModelId', BrandController.deleteHasCarModelRelation)
router.post('/brands/:brandId/has-image/:imageId', BrandController.createHasImageRelation)
router.get('/brands/:brandId/has-image/:imageId', BrandController.getSpecificHasImageRelation)
router.get('/brands/:brandId/has-image', BrandController.getAllHasImageRelations)
router.delete('/brands/:brandId/has-image/:imageId', BrandController.deleteHasImageRelation)
router.post('/brands/:brandId/has-prime-image/:imageId', BrandController.createHasPrimeImageRelation)
router.get('/brands/:brandId/has-prime-image', BrandController.getHasPrimeImageRelation)
router.delete('/brands/:brandId/has-prime-image/:imageId', BrandController.deleteHasPrimeImageRelation)

export default router
