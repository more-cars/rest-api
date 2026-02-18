import express from "express"
import {RacingGameController} from "../../controllers/node-types/RacingGameController"

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
router.post('/racing-games/:racingGameId/released-on-gaming-platform/:gamingPlatformId', RacingGameController.createReleasedOnGamingPlatformRelation)
router.get('/racing-games/:racingGameId/released-on-gaming-platform', RacingGameController.getAllReleasedOnGamingPlatformRelations)
router.delete('/racing-games/:racingGameId/released-on-gaming-platform/:gamingPlatformId', RacingGameController.deleteReleasedOnGamingPlatformRelation)
router.post('/racing-games/:racingGameId/has-image/:imageId', RacingGameController.createHasImageRelation)
router.get('/racing-games/:racingGameId/has-image', RacingGameController.getAllHasImageRelations)
router.delete('/racing-games/:racingGameId/has-image/:imageId', RacingGameController.deleteHasImageRelation)
router.post('/racing-games/:racingGameId/has-prime-image/:imageId', RacingGameController.createHasPrimeImageRelation)
router.get('/racing-games/:racingGameId/has-prime-image', RacingGameController.getHasPrimeImageRelation)
router.delete('/racing-games/:racingGameId/has-prime-image/:imageId', RacingGameController.deleteHasPrimeImageRelation)

export default router
