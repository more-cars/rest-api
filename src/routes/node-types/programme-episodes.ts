import express from "express"
import {ProgrammeEpisodeController} from "../../controllers/node-types/ProgrammeEpisodeController"

const router = express.Router()

router.post('/programme-episodes', ProgrammeEpisodeController.create)
router.get('/programme-episodes/:id', ProgrammeEpisodeController.getById)
router.get('/programme-episodes', ProgrammeEpisodeController.getAll)
router.delete('/programme-episodes/:id', ProgrammeEpisodeController.delete)

export default router
