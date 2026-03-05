import express from "express"
import {MagazineIssueController} from "../../controllers/node-types/MagazineIssueController"

const router = express.Router()

router.post('/magazine-issues', MagazineIssueController.create)
router.get('/magazine-issues/:id', MagazineIssueController.getById)
router.get('/magazine-issues', MagazineIssueController.getAll)
router.delete('/magazine-issues/:id', MagazineIssueController.delete)
router.post('/magazine-issues/:magazineIssueId/belongs-to-magazine/:magazineId', MagazineIssueController.createBelongsToMagazineRelation)
router.get('/magazine-issues/:magazineIssueId/belongs-to-magazine', MagazineIssueController.getBelongsToMagazineRelation)
router.delete('/magazine-issues/:magazineIssueId/belongs-to-magazine/:magazineId', MagazineIssueController.deleteBelongsToMagazineRelation)
router.post('/magazine-issues/:magazineIssueId/follows-issue/:partnerId', MagazineIssueController.createFollowsIssueRelation)
router.get('/magazine-issues/:magazineIssueId/follows-issue', MagazineIssueController.getFollowsIssueRelation)
router.delete('/magazine-issues/:magazineIssueId/follows-issue/:partnerId', MagazineIssueController.deleteFollowsIssueRelation)
router.post('/magazine-issues/:magazineIssueId/followed-by-issue/:partnerId', MagazineIssueController.createFollowedByIssueRelation)
router.get('/magazine-issues/:magazineIssueId/followed-by-issue', MagazineIssueController.getFollowedByIssueRelation)
router.delete('/magazine-issues/:magazineIssueId/followed-by-issue/:partnerId', MagazineIssueController.deleteFollowedByIssueRelation)
router.post('/magazine-issues/:magazineIssueId/covers-car-model/:carModelId', MagazineIssueController.createCoversCarModelRelation)
router.get('/magazine-issues/:magazineIssueId/covers-car-model', MagazineIssueController.getAllCoversCarModelRelations)
router.post('/magazine-issues/:magazineIssueId/has-image/:imageId', MagazineIssueController.createHasImageRelation)
router.get('/magazine-issues/:magazineIssueId/has-image', MagazineIssueController.getAllHasImageRelations)
router.delete('/magazine-issues/:magazineIssueId/has-image/:imageId', MagazineIssueController.deleteHasImageRelation)
router.post('/magazine-issues/:magazineIssueId/has-prime-image/:imageId', MagazineIssueController.createHasPrimeImageRelation)
router.get('/magazine-issues/:magazineIssueId/has-prime-image', MagazineIssueController.getHasPrimeImageRelation)
router.delete('/magazine-issues/:magazineIssueId/has-prime-image/:imageId', MagazineIssueController.deleteHasPrimeImageRelation)

export default router
