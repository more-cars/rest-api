import express from "express"
import {BrandController} from "../controllers/BrandController"

const router = express.Router()

router.post('/brands', BrandController.create)
router.get('/brands/:id', BrandController.getById)
router.get('/brands', BrandController.getAll)
router.post('/brands/:brandId/has-car-model/:carModelId', BrandController.createHasCarModelRelation)
router.get('/brands/:brandId/has-car-model', BrandController.getHasCarModelRelations)
router.post('/brands/:brandId/has-image/:imageId', BrandController.createHasImageRelation)
router.get('/brands/:brandId/has-image/:imageId', BrandController.getHasImageRelation)
router.get('/brands/:brandId/has-image', BrandController.getHasImageRelations)

export default router
