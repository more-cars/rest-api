import express from "express"
import {PriceController} from "../../controllers/node-types/PriceController"

const router = express.Router()

router.post('/prices', PriceController.create)
router.get('/prices/:id', PriceController.getById)

export default router
