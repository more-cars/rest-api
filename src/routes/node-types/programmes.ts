import express from "express"
import {ProgrammeController} from "../../controllers/node-types/ProgrammeController"

const router = express.Router()

router.post('/programmes', ProgrammeController.create)
router.get('/programmes/:id', ProgrammeController.getById)
router.get('/programmes', ProgrammeController.getAll)
router.delete('/programmes/:id', ProgrammeController.delete)
router.post('/programmes/:programmeId/has-episode/:programmeEpisodeId', ProgrammeController.createHasEpisodeRelation)
router.get('/programmes/:programmeId/has-episode', ProgrammeController.getAllHasEpisodeRelations)
router.delete('/programmes/:programmeId/has-episode/:programmeEpisodeId', ProgrammeController.deleteHasEpisodeRelation)
router.post('/programmes/:programmeId/has-image/:imageId', ProgrammeController.createHasImageRelation)
router.get('/programmes/:programmeId/has-image', ProgrammeController.getAllHasImageRelations)
router.delete('/programmes/:programmeId/has-image/:imageId', ProgrammeController.deleteHasImageRelation)

export default router
