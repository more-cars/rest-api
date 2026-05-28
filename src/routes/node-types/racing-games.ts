import express from "express"
import {RacingGameController} from "../../controllers/node-types/RacingGameController"

const router = express.Router()

router.post('/racing-games', RacingGameController.create)
router.get('/racing-games/:id', RacingGameController.getById)
router.get('/racing-games', RacingGameController.getAll)
router.patch('/racing-games/:id', RacingGameController.update)
router.delete('/racing-games/:id', RacingGameController.delete)
router.post('/racing-games/:racingGameId/relationships/features-car-model-variant', RacingGameController.createFeaturesCarModelVariantRelation)
router.get('/racing-games/:racingGameId/features-car-model-variant', RacingGameController.getAllFeaturesCarModelVariantRelations)
router.delete('/racing-games/:racingGameId/relationships/features-car-model-variant', RacingGameController.deleteFeaturesCarModelVariantRelation)
router.post('/racing-games/:racingGameId/relationships/features-track-layout', RacingGameController.createFeaturesTrackLayoutRelation)
router.get('/racing-games/:racingGameId/features-track-layout', RacingGameController.getAllFeaturesTrackLayoutRelations)
router.delete('/racing-games/:racingGameId/relationships/features-track-layout', RacingGameController.deleteFeaturesTrackLayoutRelation)
router.post('/racing-games/:racingGameId/relationships/released-on-gaming-platform', RacingGameController.createReleasedOnGamingPlatformRelation)
router.get('/racing-games/:racingGameId/released-on-gaming-platform', RacingGameController.getAllReleasedOnGamingPlatformRelations)
router.delete('/racing-games/:racingGameId/relationships/released-on-gaming-platform', RacingGameController.deleteReleasedOnGamingPlatformRelation)
router.post('/racing-games/:racingGameId/relationships/has-image', RacingGameController.createHasImageRelation)
router.get('/racing-games/:racingGameId/has-image', RacingGameController.getAllHasImageRelations)
router.delete('/racing-games/:racingGameId/relationships/has-image', RacingGameController.deleteHasImageRelation)
router.post('/racing-games/:racingGameId/relationships/has-prime-image', RacingGameController.createHasPrimeImageRelation)
router.get('/racing-games/:racingGameId/has-prime-image', RacingGameController.getHasPrimeImageRelation)
router.delete('/racing-games/:racingGameId/relationships/has-prime-image', RacingGameController.deleteHasPrimeImageRelation)
router.post('/racing-games/:racingGameId/relationships/has-video', RacingGameController.createHasVideoRelation)
router.get('/racing-games/:racingGameId/has-video', RacingGameController.getAllHasVideoRelations)
router.delete('/racing-games/:racingGameId/relationships/has-video', RacingGameController.deleteHasVideoRelation)
router.post('/racing-games/:racingGameId/relationships/has-main-video', RacingGameController.createHasMainVideoRelation)
router.get('/racing-games/:racingGameId/has-main-video', RacingGameController.getHasMainVideoRelation)
router.delete('/racing-games/:racingGameId/relationships/has-main-video', RacingGameController.deleteHasMainVideoRelation)

export default router
