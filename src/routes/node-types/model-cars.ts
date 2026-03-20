import express from "express"
import {ModelCarController} from "../../controllers/node-types/ModelCarController"

const router = express.Router()

router.post('/model-cars', ModelCarController.create)
router.get('/model-cars/:id', ModelCarController.getById)
router.get('/model-cars', ModelCarController.getAll)
router.delete('/model-cars/:id', ModelCarController.delete)

export default router
