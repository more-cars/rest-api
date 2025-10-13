import express from "express"
import {ImageController} from "../controllers/ImageController"

const router = express.Router()

router.post('/images', ImageController.create)
router.get('/images/:id', ImageController.getById)
router.get('/images', ImageController.getAll)
router.delete('/images/:id', ImageController.delete)
router.post('/images/:imageId/belongs-to-node/:partnerNodeId', ImageController.createBelongsToNodeRelation)
router.get('/images/:imageId/belongs-to-node/:partnerNodeId', ImageController.getSpecificBelongsToNodeRelation)
router.get('/images/:imageId/belongs-to-node', ImageController.getAllBelongsToNodeRelations)
router.delete('/images/:imageId/belongs-to-node/:partnerNodeId', ImageController.deleteBelongsToNodeRelation)
router.get('/images/:imageId/belongs-to-node-type', ImageController.getAllBelongsToNodeTypeRelations)

export default router
