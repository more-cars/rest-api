import express from "express"
import {CompanyController} from "../controllers/CompanyController"

const router = express.Router()

router.post('/companies', CompanyController.create)
router.get('/companies/:id', CompanyController.getById)
router.get('/companies', CompanyController.getAll)
router.delete('/companies/:id', CompanyController.delete)

export default router
