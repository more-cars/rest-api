import express from "express"
import {MagazineIssueController} from "../../controllers/node-types/MagazineIssueController"

const router = express.Router()

router.post('/magazine-issues', MagazineIssueController.create)
router.get('/magazine-issues/:id', MagazineIssueController.getById)
router.get('/magazine-issues', MagazineIssueController.getAll)
router.delete('/magazine-issues/:id', MagazineIssueController.delete)

export default router
