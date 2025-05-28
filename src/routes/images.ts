import express from "express"
import {create} from "./controllers/images/create"
import {getById} from "./controllers/images/getById"
import {getAll} from "./controllers/images/getAll"

const router = express.Router()

router.post('/images', create)
router.get('/images/:id', getById)
router.get('/images', getAll)

export default router
