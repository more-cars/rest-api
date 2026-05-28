import express from "express"
import {VideoController} from "../../controllers/node-types/VideoController"

const router = express.Router()

router.post('/videos', VideoController.create)
router.get('/videos/:id', VideoController.getById)
router.get('/videos', VideoController.getAll)
router.delete('/videos/:id', VideoController.delete)
router.post('/videos/:videoId/relationships/belongs-to-node', VideoController.createBelongsToNodeRelation)
router.get('/videos/:videoId/belongs-to-node', VideoController.getAllBelongsToNodeRelations)
router.delete('/videos/:videoId/relationships/belongs-to-node', VideoController.deleteBelongsToNodeRelation)
router.post('/videos/:videoId/relationships/is-main-video-of-node', VideoController.createIsMainVideoOfNodeRelation)
router.get('/videos/:videoId/is-main-video-of-node', VideoController.getAllIsMainVideoOfNodeRelations)
router.delete('/videos/:videoId/relationships/is-main-video-of-node', VideoController.deleteIsMainVideoOfNodeRelation)

export default router
