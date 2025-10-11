import express from "express"
import {Image} from "../../models/images/Image"
import {Node} from "../../models/Node"
import type {BaseNode} from "../nodes/types/BaseNode"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getSpecificBelongsToNodeRelation(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)
    const partnerNodeId = parseInt(req.params.partnerNodeId)

    try {
        const relationship = await Image.getSpecificBelongsToNodeRelationship(imageId, partnerNodeId)
        const relationshipPartner = await Node.findById(partnerNodeId)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as BaseNode, null) // TODO provide correct partnernodetype

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
