import express from "express"
import {Image} from "../../models/images/Image"
import {marshalBelongsToNodeTypeRelationships} from "./marshalBelongsToNodeTypeRelationships"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse422} from "../responses/sendResponse422"

export async function getBelongsToNodeTypeRelations(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)

    try {
        const relationships = await Image.getBelongsToNodeTypeRelationships(imageId)

        if (!relationships) {
            return sendResponse404(res)
        }

        const marshalledData = marshalBelongsToNodeTypeRelationships(relationships)

        sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        sendResponse422(res)
    }
}
