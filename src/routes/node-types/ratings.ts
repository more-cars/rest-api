import express from "express"
import {RatingController} from "../../controllers/node-types/RatingController"

const router = express.Router()

router.post('/ratings', RatingController.create)
router.get('/ratings/:id', RatingController.getById)

export default router
