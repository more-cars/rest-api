import express from "express"
import {GamingPlatformController} from "../../controllers/node-types/GamingPlatformController"

const router = express.Router()

router.post('/gaming-platforms', GamingPlatformController.create)
router.get('/gaming-platforms/:id', GamingPlatformController.getById)
router.get('/gaming-platforms', GamingPlatformController.getAll)
router.patch('/gaming-platforms/:id', GamingPlatformController.update)
router.delete('/gaming-platforms/:id', GamingPlatformController.delete)
router.post('/gaming-platforms/:gamingPlatformId/relationships/features-racing-game', GamingPlatformController.createFeaturesRacingGameRelation)
router.get('/gaming-platforms/:gamingPlatformId/features-racing-game', GamingPlatformController.getAllFeaturesRacingGameRelations)
router.delete('/gaming-platforms/:gamingPlatformId/relationships/features-racing-game', GamingPlatformController.deleteFeaturesRacingGameRelation)
router.post('/gaming-platforms/:gamingPlatformId/relationships/has-image', GamingPlatformController.createHasImageRelation)
router.get('/gaming-platforms/:gamingPlatformId/has-image', GamingPlatformController.getAllHasImageRelations)
router.delete('/gaming-platforms/:gamingPlatformId/relationships/has-image', GamingPlatformController.deleteHasImageRelation)
router.post('/gaming-platforms/:gamingPlatformId/relationships/has-prime-image', GamingPlatformController.createHasPrimeImageRelation)
router.get('/gaming-platforms/:gamingPlatformId/has-prime-image', GamingPlatformController.getHasPrimeImageRelation)
router.delete('/gaming-platforms/:gamingPlatformId/relationships/has-prime-image', GamingPlatformController.deleteHasPrimeImageRelation)
router.post('/gaming-platforms/:gamingPlatformId/relationships/has-video', GamingPlatformController.createHasVideoRelation)
router.get('/gaming-platforms/:gamingPlatformId/has-video', GamingPlatformController.getAllHasVideoRelations)
router.delete('/gaming-platforms/:gamingPlatformId/relationships/has-video', GamingPlatformController.deleteHasVideoRelation)
router.post('/gaming-platforms/:gamingPlatformId/relationships/has-main-video', GamingPlatformController.createHasMainVideoRelation)
router.get('/gaming-platforms/:gamingPlatformId/has-main-video', GamingPlatformController.getHasMainVideoRelation)
router.delete('/gaming-platforms/:gamingPlatformId/relationships/has-main-video', GamingPlatformController.deleteHasMainVideoRelation)

export default router
