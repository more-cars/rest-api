import express from "express"
import {MagazineController} from "../../controllers/node-types/MagazineController"

const router = express.Router()

router.post('/magazines', MagazineController.create)
router.get('/magazines/:id', MagazineController.getById)
router.get('/magazines', MagazineController.getAll)
router.patch('/magazines/:id', MagazineController.update)
router.delete('/magazines/:id', MagazineController.delete)
router.post('/magazines/:magazineId/relationships/has-issue', MagazineController.createHasIssueRelation)
router.get('/magazines/:magazineId/has-issue', MagazineController.getAllHasIssueRelations)
router.delete('/magazines/:magazineId/relationships/has-issue', MagazineController.deleteHasIssueRelation)
router.post('/magazines/:magazineId/relationships/has-image', MagazineController.createHasImageRelation)
router.get('/magazines/:magazineId/has-image', MagazineController.getAllHasImageRelations)
router.delete('/magazines/:magazineId/relationships/has-image', MagazineController.deleteHasImageRelation)
router.post('/magazines/:magazineId/relationships/has-prime-image', MagazineController.createHasPrimeImageRelation)
router.get('/magazines/:magazineId/has-prime-image', MagazineController.getHasPrimeImageRelation)
router.delete('/magazines/:magazineId/relationships/has-prime-image', MagazineController.deleteHasPrimeImageRelation)
router.post('/magazines/:magazineId/relationships/has-video', MagazineController.createHasVideoRelation)
router.get('/magazines/:magazineId/has-video', MagazineController.getAllHasVideoRelations)
router.delete('/magazines/:magazineId/relationships/has-video', MagazineController.deleteHasVideoRelation)
router.post('/magazines/:magazineId/relationships/has-main-video', MagazineController.createHasMainVideoRelation)
router.get('/magazines/:magazineId/has-main-video', MagazineController.getHasMainVideoRelation)
router.delete('/magazines/:magazineId/relationships/has-main-video', MagazineController.deleteHasMainVideoRelation)

export default router
