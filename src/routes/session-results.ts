import express from "express"
import {SessionResultController} from "../controllers/SessionResultController"

const router = express.Router()

router.post('/session-results', SessionResultController.create)

export default router
