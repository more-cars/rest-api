import express from "express"
import {CompanyController} from "../controllers/CompanyController"

const router = express.Router()

router.post('/companies', CompanyController.create)
router.get('/companies/:id', CompanyController.getById)
router.get('/companies', CompanyController.getAll)
router.delete('/companies/:id', CompanyController.delete)
router.post('/companies/:companyId/has-brand/:brandId', CompanyController.createHasBrandRelation)
router.get('/companies/:companyId/has-brand', CompanyController.getAllHasBrandRelations)
router.delete('/companies/:companyId/has-brand/:brandId', CompanyController.deleteHasBrandRelation)
router.post('/companies/:companyId/has-image/:imageId', CompanyController.createHasImageRelation)
router.post('/companies/:companyId/has-prime-image/:imageId', CompanyController.createHasPrimeImageRelation)
router.get('/companies/:companyId/has-prime-image', CompanyController.getHasPrimeImageRelation)
router.delete('/companies/:companyId/has-prime-image/:imageId', CompanyController.deleteHasPrimeImageRelation)

export default router
