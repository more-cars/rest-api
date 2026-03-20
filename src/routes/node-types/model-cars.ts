import express from "express"
import {ModelCarController} from "../../controllers/node-types/ModelCarController"

const router = express.Router()

router.post('/model-cars', ModelCarController.create)
router.get('/model-cars/:id', ModelCarController.getById)
router.get('/model-cars', ModelCarController.getAll)
router.delete('/model-cars/:id', ModelCarController.delete)
router.post('/model-cars/:modelCarId/is-scale-model-of-car-model-variant/:carModelVariantId', ModelCarController.createIsScaleModelOfCarModelVariantRelation)

export default router
