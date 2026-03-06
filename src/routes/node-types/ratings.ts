import express from "express"
import {RatingController} from "../../controllers/node-types/RatingController"

const router = express.Router()

router.post('/ratings', RatingController.create)
router.get('/ratings/:id', RatingController.getById)
router.get('/ratings', RatingController.getAll)
router.delete('/ratings/:id', RatingController.delete)
router.post('/ratings/:ratingId/by-magazine-issue/:magazineIssueId', RatingController.createByMagazineIssueRelation)

export default router
