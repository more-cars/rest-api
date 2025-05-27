import express from "express"
import {create} from "./controllers/images/create"

const router = express.Router()

router.post('/images', create)

export default router
