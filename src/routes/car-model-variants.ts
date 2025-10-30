import express from "express"
import {CarModelVariantController} from "../controllers/CarModelVariantController"

const router = express.Router()

router.post('/car-model-variants', CarModelVariantController.create)
router.get('/car-model-variants/:id', CarModelVariantController.getById)
router.get('/car-model-variants', CarModelVariantController.getAll)

export default router
