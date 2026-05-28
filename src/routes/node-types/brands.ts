import express from "express"
import {BrandController} from "../../controllers/node-types/BrandController"

const router = express.Router()

router.post('/brands', BrandController.create)
router.get('/brands/:id', BrandController.getById)
router.get('/brands', BrandController.getAll)
router.patch('/brands/:id', BrandController.update)
router.delete('/brands/:id', BrandController.delete)
router.post('/brands/:brandId/relationships/belongs-to-company', BrandController.createBelongsToCompanyRelation)
router.get('/brands/:brandId/belongs-to-company', BrandController.getBelongsToCompanyRelation)
router.delete('/brands/:brandId/relationships/belongs-to-company', BrandController.deleteBelongsToCompanyRelation)
router.post('/brands/:brandId/relationships/has-car-model', BrandController.createHasCarModelRelation)
router.get('/brands/:brandId/has-car-model', BrandController.getAllHasCarModelRelations)
router.delete('/brands/:brandId/relationships/has-car-model', BrandController.deleteHasCarModelRelation)
router.post('/brands/:brandId/relationships/has-image', BrandController.createHasImageRelation)
router.get('/brands/:brandId/has-image', BrandController.getAllHasImageRelations)
router.delete('/brands/:brandId/relationships/has-image', BrandController.deleteHasImageRelation)
router.post('/brands/:brandId/relationships/has-prime-image', BrandController.createHasPrimeImageRelation)
router.get('/brands/:brandId/has-prime-image', BrandController.getHasPrimeImageRelation)
router.delete('/brands/:brandId/relationships/has-prime-image', BrandController.deleteHasPrimeImageRelation)
router.post('/brands/:brandId/relationships/has-video', BrandController.createHasVideoRelation)
router.get('/brands/:brandId/has-video', BrandController.getAllHasVideoRelations)
router.delete('/brands/:brandId/relationships/has-video', BrandController.deleteHasVideoRelation)
router.post('/brands/:brandId/relationships/has-main-video', BrandController.createHasMainVideoRelation)
router.get('/brands/:brandId/has-main-video', BrandController.getHasMainVideoRelation)
router.delete('/brands/:brandId/relationships/has-main-video', BrandController.deleteHasMainVideoRelation)

export default router
