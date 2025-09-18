import express from "express"
import {CompanyController} from "../controllers/CompanyController"

const router = express.Router()

router.post('/companies', CompanyController.create)
router.get('/companies/:id', CompanyController.getById)

export default router
