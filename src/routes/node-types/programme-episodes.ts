import express from "express"
import {ProgrammeEpisodeController} from "../../controllers/node-types/ProgrammeEpisodeController"

const router = express.Router()

router.post('/programme-episodes', ProgrammeEpisodeController.create)
router.get('/programme-episodes/:id', ProgrammeEpisodeController.getById)
router.get('/programme-episodes', ProgrammeEpisodeController.getAll)
router.delete('/programme-episodes/:id', ProgrammeEpisodeController.delete)
router.post('/programme-episodes/:programmeEpisodeId/covers-car-model/:carModelId', ProgrammeEpisodeController.createCoversCarModelRelation)
router.get('/programme-episodes/:programmeEpisodeId/covers-car-model', ProgrammeEpisodeController.getAllCoversCarModelRelations)

export default router
