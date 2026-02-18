import express from "express"
import {CarModel} from "../../../models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../models/types/RelationshipNotFoundError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function deleteHasImageRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const imageId = parseInt(req.params.imageId)

    try {
        await CarModel.deleteHasImageRelationship(carModelId, imageId)

        return sendResponse204(res)
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
