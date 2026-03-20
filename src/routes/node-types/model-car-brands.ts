import express from "express"
import {ModelCarBrandController} from "../../controllers/node-types/ModelCarBrandController"

const router = express.Router()

router.post('/model-car-brands', ModelCarBrandController.create)
router.get('/model-car-brands/:id', ModelCarBrandController.getById)
router.get('/model-car-brands', ModelCarBrandController.getAll)
router.delete('/model-car-brands/:id', ModelCarBrandController.delete)
router.post('/model-car-brands/:modelCarBrandId/created-model-car/:modelCarId', ModelCarBrandController.createCreatedModelCarRelation)
router.get('/model-car-brands/:modelCarBrandId/created-model-car', ModelCarBrandController.getAllCreatedModelCarRelations)
router.delete('/model-car-brands/:modelCarBrandId/created-model-car/:modelCarId', ModelCarBrandController.deleteCreatedModelCarRelation)

export default router
