import express from "express"
import {Image} from "../../../models/images/Image"
import {marshalRelation} from "../../relationships/marshalRelation"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../models/types/RelationshipAlreadyExistsError"
import {SemanticError} from "../../../models/types/SemanticError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse422} from "../../responses/sendResponse422"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createIsPrimeImageOfNodeRelation(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)
    const nodeId = parseInt(req.params.nodeId)

    try {
        const relation = await Image.createIsPrimeImageOfNodeRelationship(imageId, nodeId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.BRAND) // TODO determine correct partner node type

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
