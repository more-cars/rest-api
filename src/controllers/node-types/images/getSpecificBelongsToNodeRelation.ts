import express from "express"
import {Image} from "../../../models/node-types/images/Image"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelation} from "../../relations/marshalRelation"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getSpecificBelongsToNodeRelation(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)
    const partnerNodeId = parseInt(req.params.partnerNodeId)

    try {
        const modelRelation = await Image.getSpecificBelongsToNodeRelationship(imageId, partnerNodeId)
        const relation = convertModelRelationToControllerRelation(modelRelation)
        const marshalledData = marshalRelation(relation)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
