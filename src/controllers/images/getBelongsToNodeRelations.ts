import express from "express"
import {Image} from "../../models/images/Image"
import {marshalRelationships} from "./marshalRelationships"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse422} from "../responses/sendResponse422"

export async function getBelongsToNodeRelations(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)

    try {
        const relationships = await Image.getBelongsToNodeRelationships(imageId)

        if (!relationships) {
            return sendResponse404(res)
        }

        const marshalledData = marshalRelationships(relationships)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse422(res)
    }
}
