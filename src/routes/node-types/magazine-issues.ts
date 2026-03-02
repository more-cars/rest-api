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

export default router
