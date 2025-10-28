import express from "express"
import {SessionResultController} from "../controllers/SessionResultController"

const router = express.Router()

router.post('/session-results', SessionResultController.create)
router.get('/session-results/:id', SessionResultController.getById)
router.get('/session-results', SessionResultController.getAll)
router.delete('/session-results/:id', SessionResultController.delete)

export default router
