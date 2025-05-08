import express from "express"
import {openApiSpec} from "./controllers/open-api-specification"

const router = express.Router()

router.get('/', openApiSpec)

export default router
