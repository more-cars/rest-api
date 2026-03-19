import express from "express"
import {ModelCarBrandController} from "../../controllers/node-types/ModelCarBrandController"

const router = express.Router()

router.post('/model-car-brands', ModelCarBrandController.create)

export default router
