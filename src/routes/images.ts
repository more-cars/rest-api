import express from "express"
import {create} from "./controllers/images/create"
import {getById} from "./controllers/images/getById"

const router = express.Router()

router.post('/images', create)
router.get('/images/:id', getById)

export default router
