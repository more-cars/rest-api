import express from "express"
import {GamingPlatformController} from "../controllers/GamingPlatformController"

const router = express.Router()

router.post('/gaming-platforms', GamingPlatformController.create)
router.get('/gaming-platforms/:id', GamingPlatformController.getById)
router.get('/gaming-platforms', GamingPlatformController.getAll)
router.delete('/gaming-platforms/:id', GamingPlatformController.delete)
router.post('/gaming-platforms/:gamingPlatformId/features-racing-game/:racingGameId', GamingPlatformController.createFeaturesRacingGameRelation)
router.get('/gaming-platforms/:gamingPlatformId/features-racing-game', GamingPlatformController.getAllFeaturesRacingGameRelations)

export default router
