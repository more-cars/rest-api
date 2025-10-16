import express from "express"
import {RelationshipController} from "../controllers/RelationshipController"

const router = express.Router()

router.get('/relationships/:id', RelationshipController.getById)

export default router
