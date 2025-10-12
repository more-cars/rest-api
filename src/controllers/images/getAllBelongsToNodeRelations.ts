import express from "express"
import {Image} from "../../models/images/Image"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationships} from "../relationships/marshalRelationships"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getAllBelongsToNodeRelations(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)

    try {
        const relationships = await Image.getAllBelongsToNodeRelationships(imageId)
        const marshalledData = marshalRelationships(relationships as BaseRelationship[], null) // TODO provide correct partnernodetype

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
