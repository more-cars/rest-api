import express from "express"
import {CarModelVariantController} from "../controllers/CarModelVariantController"

const router = express.Router()

router.post('/car-model-variants', CarModelVariantController.create)
router.get('/car-model-variants/:id', CarModelVariantController.getById)

export default router
