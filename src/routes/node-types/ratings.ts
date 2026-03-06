import express from "express"
import {RatingController} from "../../controllers/node-types/RatingController"

const router = express.Router()

router.post('/ratings', RatingController.create)
router.get('/ratings/:id', RatingController.getById)
router.get('/ratings', RatingController.getAll)
router.delete('/ratings/:id', RatingController.delete)
router.post('/ratings/:ratingId/by-magazine-issue/:magazineIssueId', RatingController.createByMagazineIssueRelation)
router.get('/ratings/:ratingId/by-magazine-issue', RatingController.getByMagazineIssueRelation)
router.delete('/ratings/:ratingId/by-magazine-issue/:magazineIssueId', RatingController.deleteByMagazineIssueRelation)
router.post('/ratings/:ratingId/for-car-model-variant/:carModelVariantId', RatingController.createForCarModelVariantRelation)
router.get('/ratings/:ratingId/for-car-model-variant', RatingController.getForCarModelVariantRelation)
router.delete('/ratings/:ratingId/for-car-model-variant/:carModelVariantId', RatingController.deleteForCarModelVariantRelation)
router.post('/ratings/:ratingId/has-image/:imageId', RatingController.createHasImageRelation)
router.get('/ratings/:ratingId/has-image', RatingController.getAllHasImageRelations)

export default router
