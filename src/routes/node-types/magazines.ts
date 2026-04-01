import express from "express"
import {MagazineController} from "../../controllers/node-types/MagazineController"

const router = express.Router()

router.post('/magazines', MagazineController.create)
router.get('/magazines/:id', MagazineController.getById)
router.get('/magazines', MagazineController.getAll)
router.delete('/magazines/:id', MagazineController.delete)
router.post('/magazines/:magazineId/has-issue/:magazineIssueId', MagazineController.createHasIssueRelation)
router.get('/magazines/:magazineId/has-issue', MagazineController.getAllHasIssueRelations)
router.delete('/magazines/:magazineId/has-issue/:magazineIssueId', MagazineController.deleteHasIssueRelation)
router.post('/magazines/:magazineId/has-image/:imageId', MagazineController.createHasImageRelation)
router.get('/magazines/:magazineId/has-image', MagazineController.getAllHasImageRelations)
router.delete('/magazines/:magazineId/has-image/:imageId', MagazineController.deleteHasImageRelation)
router.post('/magazines/:magazineId/has-prime-image/:imageId', MagazineController.createHasPrimeImageRelation)
router.get('/magazines/:magazineId/has-prime-image', MagazineController.getHasPrimeImageRelation)
router.delete('/magazines/:magazineId/has-prime-image/:imageId', MagazineController.deleteHasPrimeImageRelation)
router.post('/magazines/:magazineId/has-video/:videoId', MagazineController.createHasVideoRelation)
router.get('/magazines/:magazineId/has-video', MagazineController.getAllHasVideoRelations)
router.delete('/magazines/:magazineId/has-video/:videoId', MagazineController.deleteHasVideoRelation)
router.post('/magazines/:magazineId/has-main-video/:videoId', MagazineController.createHasMainVideoRelation)
router.get('/magazines/:magazineId/has-main-video', MagazineController.getHasMainVideoRelation)
router.delete('/magazines/:magazineId/has-main-video/:videoId', MagazineController.deleteHasMainVideoRelation)

export default router
