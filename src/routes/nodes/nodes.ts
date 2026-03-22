import express from "express"
import {NodeController} from "../../controllers/NodeController"

const router = express.Router()

router.get('/nodes/:id', NodeController.getById)

export default router
