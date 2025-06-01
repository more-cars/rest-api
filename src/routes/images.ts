import express from "express"
import {create} from "./controllers/images/create"
import {getById} from "./controllers/images/getById"
import {getAll} from "./controllers/images/getAll"
import {createBelongsToNodeRelation} from "./controllers/images/createBelongsToNodeRelation"
import {getBelongsToNodeRelation} from "./controllers/images/getBelongsToNodeRelation"
import {getBelongsToNodeRelations} from "./controllers/images/getBelongsToNodeRelations"

const router = express.Router()

router.post('/images', create)
router.get('/images/:id', getById)
router.get('/images', getAll)
router.post('/images/:imageId/belongs-to-node/:partnerNodeId', createBelongsToNodeRelation)
router.get('/images/:imageId/belongs-to-node/:partnerNodeId', getBelongsToNodeRelation)
router.get('/images/:imageId/belongs-to-node', getBelongsToNodeRelations)

export default router
