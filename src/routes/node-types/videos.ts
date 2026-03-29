import express from "express"
import {VideoController} from "../../controllers/node-types/VideoController"

const router = express.Router()

router.post('/videos', VideoController.create)
router.get('/videos/:id', VideoController.getById)
router.get('/videos', VideoController.getAll)
router.delete('/videos/:id', VideoController.delete)
router.post('/videos/:videoId/belongs-to-node/:nodeId', VideoController.createBelongsToNodeRelation)
router.get('/videos/:videoId/belongs-to-node', VideoController.getAllBelongsToNodeRelations)
router.delete('/videos/:videoId/belongs-to-node/:nodeId', VideoController.deleteBelongsToNodeRelation)
router.post('/videos/:videoId/is-main-video-of-node/:nodeId', VideoController.createIsMainVideoOfNodeRelation)

export default router
