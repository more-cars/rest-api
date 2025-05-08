import express from "express"
import {create} from "./controllers/carModels/create"
import {getById} from "./controllers/carModels/getById"
import {getAll} from "./controllers/carModels/getAll"

const router = express.Router()

router.post('/car-models', create)
router.get('/car-models/:id', getById)
router.get('/car-models', getAll)

export default router
