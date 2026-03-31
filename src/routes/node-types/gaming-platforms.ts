import express from "express"
import {GamingPlatformController} from "../../controllers/node-types/GamingPlatformController"

const router = express.Router()

router.post('/gaming-platforms', GamingPlatformController.create)
router.get('/gaming-platforms/:id', GamingPlatformController.getById)
router.get('/gaming-platforms', GamingPlatformController.getAll)
router.delete('/gaming-platforms/:id', GamingPlatformController.delete)
router.post('/gaming-platforms/:gamingPlatformId/features-racing-game/:racingGameId', GamingPlatformController.createFeaturesRacingGameRelation)
router.get('/gaming-platforms/:gamingPlatformId/features-racing-game', GamingPlatformController.getAllFeaturesRacingGameRelations)
router.delete('/gaming-platforms/:gamingPlatformId/features-racing-game/:racingGameId', GamingPlatformController.deleteFeaturesRacingGameRelation)
router.post('/gaming-platforms/:gamingPlatformId/has-image/:imageId', GamingPlatformController.createHasImageRelation)
router.get('/gaming-platforms/:gamingPlatformId/has-image', GamingPlatformController.getAllHasImageRelations)
router.delete('/gaming-platforms/:gamingPlatformId/has-image/:imageId', GamingPlatformController.deleteHasImageRelation)
router.post('/gaming-platforms/:gamingPlatformId/has-prime-image/:imageId', GamingPlatformController.createHasPrimeImageRelation)
router.get('/gaming-platforms/:gamingPlatformId/has-prime-image', GamingPlatformController.getHasPrimeImageRelation)
router.delete('/gaming-platforms/:gamingPlatformId/has-prime-image/:imageId', GamingPlatformController.deleteHasPrimeImageRelation)
router.post('/gaming-platforms/:gamingPlatformId/has-video/:videoId', GamingPlatformController.createHasVideoRelation)
router.get('/gaming-platforms/:gamingPlatformId/has-video', GamingPlatformController.getAllHasVideoRelations)
router.delete('/gaming-platforms/:gamingPlatformId/has-video/:videoId', GamingPlatformController.deleteHasVideoRelation)
router.post('/gaming-platforms/:gamingPlatformId/has-main-video/:videoId', GamingPlatformController.createHasMainVideoRelation)
router.get('/gaming-platforms/:gamingPlatformId/has-main-video', GamingPlatformController.getHasMainVideoRelation)
router.delete('/gaming-platforms/:gamingPlatformId/has-main-video/:videoId', GamingPlatformController.deleteHasMainVideoRelation)

export default router
