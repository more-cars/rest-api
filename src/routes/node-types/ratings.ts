import express from "express"
import {RatingController} from "../../controllers/node-types/RatingController"

const router = express.Router()

router.post('/ratings', RatingController.create)

export default router
