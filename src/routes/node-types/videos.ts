import express from "express"
import {VideoController} from "../../controllers/node-types/VideoController"

const router = express.Router()

router.post('/videos', VideoController.create)

export default router
