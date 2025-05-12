import express from "express"
import {create} from "./controllers/carModels/create"
import {getById} from "./controllers/carModels/getById"
import {getAll} from "./controllers/carModels/getAll"
import {createBelongsToBrandRelation} from "./controllers/carModels/createBelongsToBrandRelation"

const router = express.Router()

router.post('/car-models', create)
router.get('/car-models/:id', getById)
router.get('/car-models', getAll)
router.post('/car-models/:carModelId/belongs-to-brand/:brandId', createBelongsToBrandRelation)

export default router
