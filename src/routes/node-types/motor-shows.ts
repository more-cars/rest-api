import express from "express"
import {MotorShowController} from "../../controllers/node-types/MotorShowController"

const router = express.Router()

router.post('/motor-shows', MotorShowController.create)
router.get('/motor-shows/:id', MotorShowController.getById)
router.get('/motor-shows', MotorShowController.getAll)
router.delete('/motor-shows/:id', MotorShowController.delete)
router.post('/motor-shows/:motorShowId/presents-car-model-variant/:carModelVariantId', MotorShowController.createPresentsCarModelVariantRelation)
router.get('/motor-shows/:motorShowId/presents-car-model-variant', MotorShowController.getAllPresentsCarModelVariantRelations)
router.delete('/motor-shows/:motorShowId/presents-car-model-variant/:carModelVariantId', MotorShowController.deletePresentsCarModelVariantRelation)
router.post('/motor-shows/:motorShowId/has-image/:imageId', MotorShowController.createHasImageRelation)
router.get('/motor-shows/:motorShowId/has-image', MotorShowController.getAllHasImageRelations)
router.delete('/motor-shows/:motorShowId/has-image/:imageId', MotorShowController.deleteHasImageRelation)
router.post('/motor-shows/:motorShowId/has-prime-image/:imageId', MotorShowController.createHasPrimeImageRelation)
router.get('/motor-shows/:motorShowId/has-prime-image', MotorShowController.getHasPrimeImageRelation)

export default router
