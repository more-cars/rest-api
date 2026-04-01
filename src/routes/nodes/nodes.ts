import express from "express"
import {NodeController} from "../../controllers/NodeController"

const router = express.Router()

router.get('/nodes/:id', NodeController.getById)
router.get('/nodes/:ids/has-prime-image', NodeController.getNodesPrimeImage)

export default router
