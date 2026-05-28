import express from "express"
import {CompanyController} from "../../controllers/node-types/CompanyController"

const router = express.Router()

router.post('/companies', CompanyController.create)
router.get('/companies/:id', CompanyController.getById)
router.get('/companies', CompanyController.getAll)
router.patch('/companies/:id', CompanyController.update)
router.delete('/companies/:id', CompanyController.delete)
router.post('/companies/:companyId/relationships/has-brand', CompanyController.createHasBrandRelation)
router.get('/companies/:companyId/has-brand', CompanyController.getAllHasBrandRelations)
router.delete('/companies/:companyId/relationships/has-brand', CompanyController.deleteHasBrandRelation)
router.post('/companies/:companyId/relationships/has-image', CompanyController.createHasImageRelation)
router.get('/companies/:companyId/has-image', CompanyController.getAllHasImageRelations)
router.delete('/companies/:companyId/relationships/has-image', CompanyController.deleteHasImageRelation)
router.post('/companies/:companyId/relationships/has-prime-image', CompanyController.createHasPrimeImageRelation)
router.get('/companies/:companyId/has-prime-image', CompanyController.getHasPrimeImageRelation)
router.delete('/companies/:companyId/relationships/has-prime-image', CompanyController.deleteHasPrimeImageRelation)
router.post('/companies/:companyId/relationships/has-video', CompanyController.createHasVideoRelation)
router.get('/companies/:companyId/has-video', CompanyController.getAllHasVideoRelations)
router.delete('/companies/:companyId/relationships/has-video', CompanyController.deleteHasVideoRelation)
router.post('/companies/:companyId/relationships/has-main-video', CompanyController.createHasMainVideoRelation)
router.get('/companies/:companyId/has-main-video', CompanyController.getHasMainVideoRelation)
router.delete('/companies/:companyId/relationships/has-main-video', CompanyController.deleteHasMainVideoRelation)

export default router
