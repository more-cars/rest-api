import express from "express"
import {create} from "./controllers/images/create"
import {getById} from "./controllers/images/getById"
import {getAll} from "./controllers/images/getAll"
import {createBelongsToNodeRelation} from "./controllers/images/createBelongsToNodeRelation"

const router = express.Router()

router.post('/images', create)
router.get('/images/:id', getById)
router.get('/images', getAll)
router.post('/images/:imageId/belongs-to-node/:partnerNodeId', createBelongsToNodeRelation)

export default router
