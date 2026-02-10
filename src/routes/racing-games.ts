import express from "express"
import {RacingGameController} from "../controllers/RacingGameController"

const router = express.Router()

router.post('/racing-games', RacingGameController.create)
router.get('/racing-games/:id', RacingGameController.getById)
router.get('/racing-games', RacingGameController.getAll)
router.delete('/racing-games/:id', RacingGameController.delete)
router.post('/racing-games/:racingGameId/features-car-model-variant/:carModelVariantId', RacingGameController.createFeaturesCarModelVariantRelation)

export default router
