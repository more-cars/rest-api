import express from "express"
import {MagazineIssueController} from "../../controllers/node-types/MagazineIssueController"

const router = express.Router()

router.post('/magazine-issues', MagazineIssueController.create)
router.get('/magazine-issues/:id', MagazineIssueController.getById)

export default router
