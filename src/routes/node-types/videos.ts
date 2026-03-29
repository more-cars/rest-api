import express from "express"
import {VideoController} from "../../controllers/node-types/VideoController"

const router = express.Router()

router.post('/videos', VideoController.create)
router.get('/videos/:id', VideoController.getById)
router.get('/videos', VideoController.getAll)

export default router
