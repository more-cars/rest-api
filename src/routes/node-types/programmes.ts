import express from "express"
import {ProgrammeController} from "../../controllers/node-types/ProgrammeController"

const router = express.Router()

router.post('/programmes', ProgrammeController.create)
router.get('/programmes/:id', ProgrammeController.getById)
router.get('/programmes', ProgrammeController.getAll)
router.patch('/programmes/:id', ProgrammeController.update)
router.delete('/programmes/:id', ProgrammeController.delete)
router.post('/programmes/:programmeId/relationships/has-episode', ProgrammeController.createHasEpisodeRelation)
router.get('/programmes/:programmeId/has-episode', ProgrammeController.getAllHasEpisodeRelations)
router.delete('/programmes/:programmeId/relationships/has-episode', ProgrammeController.deleteHasEpisodeRelation)
router.post('/programmes/:programmeId/relationships/has-image', ProgrammeController.createHasImageRelation)
router.get('/programmes/:programmeId/has-image', ProgrammeController.getAllHasImageRelations)
router.delete('/programmes/:programmeId/relationships/has-image', ProgrammeController.deleteHasImageRelation)
router.post('/programmes/:programmeId/relationships/has-prime-image', ProgrammeController.createHasPrimeImageRelation)
router.get('/programmes/:programmeId/has-prime-image', ProgrammeController.getHasPrimeImageRelation)
router.delete('/programmes/:programmeId/relationships/has-prime-image', ProgrammeController.deleteHasPrimeImageRelation)
router.post('/programmes/:programmeId/relationships/has-video', ProgrammeController.createHasVideoRelation)
router.get('/programmes/:programmeId/has-video', ProgrammeController.getAllHasVideoRelations)
router.delete('/programmes/:programmeId/relationships/has-video', ProgrammeController.deleteHasVideoRelation)
router.post('/programmes/:programmeId/relationships/has-main-video', ProgrammeController.createHasMainVideoRelation)
router.get('/programmes/:programmeId/has-main-video', ProgrammeController.getHasMainVideoRelation)
router.delete('/programmes/:programmeId/relationships/has-main-video', ProgrammeController.deleteHasMainVideoRelation)

export default router
