import express from "express"
import {Image} from "../../models/images/Image"
import {Node} from "../../models/Node"
import type {BaseNode} from "../nodes/types/BaseNode"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse422} from "../responses/sendResponse422"

export async function getBelongsToNodeRelation(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)
    const partnerNodeId = parseInt(req.params.partnerNodeId)

    try {
        const relationship = await Image.getBelongsToNodeRelationship(imageId, partnerNodeId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const relationshipPartner = await Node.findById(partnerNodeId)
        const marshalledData = marshalRelationship(relationship, relationshipPartner as BaseNode, null) // TODO provide correct partnernodetype

        return sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse422(res)
    }
}
