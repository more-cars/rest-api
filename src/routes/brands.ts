import express from "express"
import {create} from "../controllers/brands/create"
import {getById} from "../controllers/brands/getById"
import {getAll} from "../controllers/brands/getAll"
import {createHasCarModelRelation} from "../controllers/brands/createHasCarModelRelation"
import {getHasCarModelRelations} from "../controllers/brands/getHasCarModelRelations"
import {createHasImageRelation} from "../controllers/brands/createHasImageRelation.ts"

const router = express.Router()

router.post('/brands', create)
router.get('/brands/:id', getById)
router.get('/brands', getAll)
router.post('/brands/:brandId/has-car-model/:carModelId', createHasCarModelRelation)
router.get('/brands/:brandId/has-car-model', getHasCarModelRelations)
router.post('/brands/:brandId/has-image/:imageId', createHasImageRelation)

export default router
