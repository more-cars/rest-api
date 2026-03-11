import express from "express"
import {ProgrammeEpisodeController} from "../../controllers/node-types/ProgrammeEpisodeController"

const router = express.Router()

router.post('/programme-episodes', ProgrammeEpisodeController.create)
router.get('/programme-episodes/:id', ProgrammeEpisodeController.getById)

export default router
