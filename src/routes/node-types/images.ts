import express from "express"
import {ImageController} from "../../controllers/node-types/ImageController"

const router = express.Router()

router.post('/images', ImageController.create)
router.get('/images/:id', ImageController.getById)
router.get('/images', ImageController.getAll)
router.delete('/images/:id', ImageController.delete)
router.post('/images/:imageId/relationships/belongs-to-node', ImageController.createBelongsToNodeRelation)
router.get('/images/:imageId/belongs-to-node', ImageController.getAllBelongsToNodeRelations)
router.delete('/images/:imageId/relationships/belongs-to-node', ImageController.deleteBelongsToNodeRelation)
router.post('/images/:imageId/relationships/is-prime-image-of-node', ImageController.createIsPrimeImageOfNodeRelation)
router.get('/images/:imageId/is-prime-image-of-node', ImageController.getAllIsPrimeImageOfNodeRelations)
router.delete('/images/:imageId/relationships/is-prime-image-of-node', ImageController.deleteIsPrimeImageOfNodeRelation)

export default router
