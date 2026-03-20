import express from "express"
import {PriceController} from "../../controllers/node-types/PriceController"

const router = express.Router()

router.post('/prices', PriceController.create)
router.get('/prices/:id', PriceController.getById)
router.get('/prices', PriceController.getAll)
router.delete('/prices/:id', PriceController.delete)
router.post('/prices/:priceId/for-car-model-variant/:carModelVariantId', PriceController.createForCarModelVariantRelation)
router.get('/prices/:priceId/for-car-model-variant', PriceController.getForCarModelVariantRelation)
router.delete('/prices/:priceId/for-car-model-variant/:carModelVariantId', PriceController.deleteForCarModelVariantRelation)
router.post('/prices/:priceId/has-image/:imageId', PriceController.createHasImageRelation)
router.get('/prices/:priceId/has-image', PriceController.getAllHasImageRelations)

export default router
