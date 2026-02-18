import express from "express"
import {Image} from "../../../models/node-types/images/Image"
import {marshalBelongsToNodeTypeRelationships} from "./marshalling/marshalBelongsToNodeTypeRelationships"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse422} from "../../responses/sendResponse422"

export async function getAllBelongsToNodeTypeRelations(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)

    try {
        const relationships = await Image.getBelongsToNodeTypeRelationships(imageId)

        if (!relationships) {
            return sendResponse404(res)
        }

        const marshalledData = marshalBelongsToNodeTypeRelationships(relationships)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse422(res)
    }
}
