import express from "express"
import {RatingController} from "../../controllers/node-types/RatingController"

const router = express.Router()

router.post('/ratings', RatingController.create)
router.get('/ratings/:id', RatingController.getById)
router.get('/ratings', RatingController.getAll)
router.patch('/ratings/:id', RatingController.update)
router.delete('/ratings/:id', RatingController.delete)
router.post('/ratings/:ratingId/relationships/by-magazine-issue', RatingController.createByMagazineIssueRelation)
router.get('/ratings/:ratingId/by-magazine-issue', RatingController.getByMagazineIssueRelation)
router.delete('/ratings/:ratingId/relationships/by-magazine-issue', RatingController.deleteByMagazineIssueRelation)
router.post('/ratings/:ratingId/relationships/for-car-model-variant', RatingController.createForCarModelVariantRelation)
router.get('/ratings/:ratingId/for-car-model-variant', RatingController.getForCarModelVariantRelation)
router.delete('/ratings/:ratingId/relationships/for-car-model-variant', RatingController.deleteForCarModelVariantRelation)
router.post('/ratings/:ratingId/relationships/has-image', RatingController.createHasImageRelation)
router.get('/ratings/:ratingId/has-image', RatingController.getAllHasImageRelations)
router.delete('/ratings/:ratingId/relationships/has-image', RatingController.deleteHasImageRelation)
router.post('/ratings/:ratingId/relationships/has-prime-image', RatingController.createHasPrimeImageRelation)
router.get('/ratings/:ratingId/has-prime-image', RatingController.getHasPrimeImageRelation)
router.delete('/ratings/:ratingId/relationships/has-prime-image', RatingController.deleteHasPrimeImageRelation)

export default router
