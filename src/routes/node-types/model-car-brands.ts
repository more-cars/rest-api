import express from "express"
import {ModelCarBrandController} from "../../controllers/node-types/ModelCarBrandController"

const router = express.Router()

router.post('/model-car-brands', ModelCarBrandController.create)
router.get('/model-car-brands/:id', ModelCarBrandController.getById)
router.get('/model-car-brands', ModelCarBrandController.getAll)
router.delete('/model-car-brands/:id', ModelCarBrandController.delete)

export default router
