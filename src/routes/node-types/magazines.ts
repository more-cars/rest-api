import express from "express"
import {MagazineController} from "../../controllers/node-types/MagazineController"

const router = express.Router()

router.post('/magazines', MagazineController.create)

export default router
