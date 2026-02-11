import express from "express"
import {RacingGameController} from "../controllers/RacingGameController"

const router = express.Router()

router.post('/racing-games', RacingGameController.create)
router.get('/racing-games/:id', RacingGameController.getById)
router.get('/racing-games', RacingGameController.getAll)
router.delete('/racing-games/:id', RacingGameController.delete)
router.post('/racing-games/:racingGameId/features-car-model-variant/:carModelVariantId', RacingGameController.createFeaturesCarModelVariantRelation)
router.get('/racing-games/:racingGameId/features-car-model-variant', RacingGameController.getAllFeaturesCarModelVariantRelations)
router.delete('/racing-games/:racingGameId/features-car-model-variant/:carModelVariantId', RacingGameController.deleteFeaturesCarModelVariantRelation)
router.post('/racing-games/:racingGameId/features-track-layout/:trackLayoutId', RacingGameController.createFeaturesTrackLayoutRelation)
router.get('/racing-games/:racingGameId/features-track-layout', RacingGameController.getAllFeaturesTrackLayoutRelations)
router.delete('/racing-games/:racingGameId/features-track-layout/:trackLayoutId', RacingGameController.deleteFeaturesTrackLayoutRelation)
router.post('/racing-games/:racingGameId/has-image/:imageId', RacingGameController.createHasImageRelation)
router.get('/racing-games/:racingGameId/has-image', RacingGameController.getAllHasImageRelations)

export default router
