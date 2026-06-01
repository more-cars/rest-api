import express from "express"
import {ApiSpecController} from "../controllers/ApiSpecController"

const router = express.Router()

router.get('/specification', ApiSpecController.apiSpec)

export default router
