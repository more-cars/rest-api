import express from "express"
import {MotorShowController} from "../../controllers/node-types/MotorShowController"

const router = express.Router()

router.post('/motor-shows', MotorShowController.create)
router.get('/motor-shows/:id', MotorShowController.getById)
router.get('/motor-shows', MotorShowController.getAll)
router.patch('/motor-shows/:id', MotorShowController.update)
router.delete('/motor-shows/:id', MotorShowController.delete)
router.post('/motor-shows/:motorShowId/relationships/presents-car-model-variant', MotorShowController.createPresentsCarModelVariantRelation)
router.get('/motor-shows/:motorShowId/presents-car-model-variant', MotorShowController.getAllPresentsCarModelVariantRelations)
router.delete('/motor-shows/:motorShowId/relationships/presents-car-model-variant', MotorShowController.deletePresentsCarModelVariantRelation)
router.post('/motor-shows/:motorShowId/relationships/has-image', MotorShowController.createHasImageRelation)
router.get('/motor-shows/:motorShowId/has-image', MotorShowController.getAllHasImageRelations)
router.delete('/motor-shows/:motorShowId/relationships/has-image', MotorShowController.deleteHasImageRelation)
router.post('/motor-shows/:motorShowId/relationships/has-prime-image', MotorShowController.createHasPrimeImageRelation)
router.get('/motor-shows/:motorShowId/has-prime-image', MotorShowController.getHasPrimeImageRelation)
router.delete('/motor-shows/:motorShowId/relationships/has-prime-image', MotorShowController.deleteHasPrimeImageRelation)
router.post('/motor-shows/:motorShowId/relationships/has-video', MotorShowController.createHasVideoRelation)
router.get('/motor-shows/:motorShowId/has-video', MotorShowController.getAllHasVideoRelations)
router.delete('/motor-shows/:motorShowId/relationships/has-video', MotorShowController.deleteHasVideoRelation)
router.post('/motor-shows/:motorShowId/relationships/has-main-video', MotorShowController.createHasMainVideoRelation)
router.get('/motor-shows/:motorShowId/has-main-video', MotorShowController.getHasMainVideoRelation)
router.delete('/motor-shows/:motorShowId/relationships/has-main-video', MotorShowController.deleteHasMainVideoRelation)

export default router
