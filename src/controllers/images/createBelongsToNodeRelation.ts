import express from "express"
import {Image} from "../../models/images/Image"
import {Node} from "../../models/Node"
import type {BaseNode} from "../nodes/types/BaseNode"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {SemanticError} from "../../models/types/SemanticError"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse422} from "../responses/sendResponse422"
import {sendResponse500} from "../responses/sendResponse500"

export async function createBelongsToNodeRelation(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)
    const partnerNodeId = parseInt(req.params.partnerNodeId)

    try {
        const relationship = await Image.createBelongsToNodeRelationship(imageId, partnerNodeId)
        const relationshipPartner = await Node.findById(partnerNodeId)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as BaseNode, 'brand') // TODO provide correct partnernodetype

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof SemanticError) {
            return sendResponse422(res)
        } else if (e instanceof RelationshipAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
