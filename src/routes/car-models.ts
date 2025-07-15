import express from "express"
import {create} from "../controllers/carModels/create"
import {getById} from "../controllers/carModels/getById"
import {getAll} from "../controllers/carModels/getAll"
import {createBelongsToBrandRelation} from "../controllers/carModels/createBelongsToBrandRelation"
import {getBelongsToBrandRelation} from "../controllers/carModels/getBelongsToBrandRelation"
import {createHasImageRelation} from "../controllers/carModels/createHasImageRelation"
import {getHasImageRelations} from "../controllers/carModels/getHasImageRelations"

const router = express.Router()

router.post('/car-models', create)
router.get('/car-models/:id', getById)
router.get('/car-models', getAll)
router.post('/car-models/:carModelId/belongs-to-brand/:brandId', createBelongsToBrandRelation)
router.get('/car-models/:carModelId/belongs-to-brand', getBelongsToBrandRelation)
router.post('/car-models/:carModelId/has-image/:imageId', createHasImageRelation)
router.get('/car-models/:carModelId/has-image', getHasImageRelations)

export default router
