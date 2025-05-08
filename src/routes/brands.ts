import express from "express"
import {create} from "./controllers/brands/create"
import {getById} from "./controllers/brands/getById"
import {getAll} from "./controllers/brands/getAll"

const router = express.Router()

router.post('/brands', create)
router.get('/brands/:id', getById)
router.get('/brands', getAll)

export default router
