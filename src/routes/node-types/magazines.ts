import express from "express"
import {MagazineController} from "../../controllers/node-types/MagazineController"

const router = express.Router()

router.post('/magazines', MagazineController.create)
router.get('/magazines/:id', MagazineController.getById)
router.get('/magazines', MagazineController.getAll)
router.delete('/magazines/:id', MagazineController.delete)

export default router
