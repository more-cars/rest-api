import express from "express"
import {ImageController} from "../controllers/ImageController"

const router = express.Router()

router.post('/images', ImageController.create)
router.get('/images/:id', ImageController.getById)
router.get('/images', ImageController.getAll)
router.post('/images/:imageId/belongs-to-node/:partnerNodeId', ImageController.createBelongsToNodeRelation)
router.get('/images/:imageId/belongs-to-node/:partnerNodeId', ImageController.getBelongsToNodeRelation)
router.get('/images/:imageId/belongs-to-node', ImageController.getBelongsToNodeRelations)

export default router
