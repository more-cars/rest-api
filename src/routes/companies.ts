import express from "express"
import {CompanyController} from "../controllers/CompanyController"

const router = express.Router()

router.post('/companies', CompanyController.create)

export default router
