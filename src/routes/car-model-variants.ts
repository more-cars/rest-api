import express from "express"
import {CarModelVariantController} from "../controllers/CarModelVariantController"

const router = express.Router()

router.post('/car-model-variants', CarModelVariantController.create)

export default router
