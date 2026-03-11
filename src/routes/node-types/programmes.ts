import express from "express"
import {ProgrammeController} from "../../controllers/node-types/ProgrammeController"

const router = express.Router()

router.post('/programmes', ProgrammeController.create)
router.get('/programmes/:id', ProgrammeController.getById)
router.get('/programmes', ProgrammeController.getAll)
router.delete('/programmes/:id', ProgrammeController.delete)

export default router
