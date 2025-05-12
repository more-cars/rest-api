import express from "express"
import {create} from "./controllers/brands/create"
import {getById} from "./controllers/brands/getById"
import {getAll} from "./controllers/brands/getAll"
import {createHasCarModelRelation} from "./controllers/brands/createHasCarModelRelation"

const router = express.Router()

router.post('/brands', create)
router.get('/brands/:id', getById)
router.get('/brands', getAll)
router.post('/brands/:brandId/has-car-model/:carModelId', createHasCarModelRelation)

export default router
