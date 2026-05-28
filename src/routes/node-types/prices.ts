import express from "express"
import {PriceController} from "../../controllers/node-types/PriceController"

const router = express.Router()

router.post('/prices', PriceController.create)
router.get('/prices/:id', PriceController.getById)
router.get('/prices', PriceController.getAll)
router.patch('/prices/:id', PriceController.update)
router.delete('/prices/:id', PriceController.delete)
router.post('/prices/:priceId/relationships/for-car-model-variant', PriceController.createForCarModelVariantRelation)
router.get('/prices/:priceId/for-car-model-variant', PriceController.getForCarModelVariantRelation)
router.delete('/prices/:priceId/relationships/for-car-model-variant', PriceController.deleteForCarModelVariantRelation)
router.post('/prices/:priceId/relationships/has-image', PriceController.createHasImageRelation)
router.get('/prices/:priceId/has-image', PriceController.getAllHasImageRelations)
router.delete('/prices/:priceId/relationships/has-image', PriceController.deleteHasImageRelation)
router.post('/prices/:priceId/relationships/has-prime-image', PriceController.createHasPrimeImageRelation)
router.get('/prices/:priceId/has-prime-image', PriceController.getHasPrimeImageRelation)
router.delete('/prices/:priceId/relationships/has-prime-image', PriceController.deleteHasPrimeImageRelation)

export default router
