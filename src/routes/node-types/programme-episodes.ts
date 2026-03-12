import express from "express"
import {ProgrammeEpisodeController} from "../../controllers/node-types/ProgrammeEpisodeController"

const router = express.Router()

router.post('/programme-episodes', ProgrammeEpisodeController.create)
router.get('/programme-episodes/:id', ProgrammeEpisodeController.getById)
router.get('/programme-episodes', ProgrammeEpisodeController.getAll)
router.delete('/programme-episodes/:id', ProgrammeEpisodeController.delete)
router.post('/programme-episodes/:programmeEpisodeId/belongs-to-programme/:programmeId', ProgrammeEpisodeController.createBelongsToProgrammeRelation)
router.get('/programme-episodes/:programmeEpisodeId/belongs-to-programme', ProgrammeEpisodeController.getBelongsToProgrammeRelation)
router.delete('/programme-episodes/:programmeEpisodeId/belongs-to-programme/:programmeId', ProgrammeEpisodeController.deleteBelongsToProgrammeRelation)
router.post('/programme-episodes/:programmeEpisodeId/covers-car-model/:carModelId', ProgrammeEpisodeController.createCoversCarModelRelation)
router.get('/programme-episodes/:programmeEpisodeId/covers-car-model', ProgrammeEpisodeController.getAllCoversCarModelRelations)
router.delete('/programme-episodes/:programmeEpisodeId/covers-car-model/:carModelId', ProgrammeEpisodeController.deleteCoversCarModelRelation)
router.post('/programme-episodes/:programmeEpisodeId/features-car-model-variant/:carModelVariantId', ProgrammeEpisodeController.createFeaturesCarModelVariantRelation)
router.get('/programme-episodes/:programmeEpisodeId/features-car-model-variant', ProgrammeEpisodeController.getAllFeaturesCarModelVariantRelations)
router.delete('/programme-episodes/:programmeEpisodeId/features-car-model-variant/:carModelVariantId', ProgrammeEpisodeController.deleteFeaturesCarModelVariantRelation)

export default router
