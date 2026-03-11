import express from "express"
import {MotorShowController} from "../../controllers/node-types/MotorShowController"

const router = express.Router()

router.post('/motor-shows', MotorShowController.create)
router.get('/motor-shows/:id', MotorShowController.getById)

export default router
