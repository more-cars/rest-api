import express from "express"
import {MagazineController} from "../../controllers/node-types/MagazineController"

const router = express.Router()

router.post('/magazines', MagazineController.create)
router.get('/magazines/:id', MagazineController.getById)
router.get('/magazines', MagazineController.getAll)
router.delete('/magazines/:id', MagazineController.delete)
router.post('/magazines/:magazineId/has-image/:imageId', MagazineController.createHasImageRelation)
router.get('/magazines/:magazineId/has-image', MagazineController.getAllHasImageRelations)
router.delete('/magazines/:magazineId/has-image/:imageId', MagazineController.deleteHasImageRelation)
router.post('/magazines/:magazineId/has-prime-image/:imageId', MagazineController.createHasPrimeImageRelation)

export default router
