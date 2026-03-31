import express from "express"
import {ModelCar} from "../../../models/node-types/model-cars/ModelCar"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function deleteHasVideoRelation(req: express.Request, res: express.Response) {
    const modelCarId = parseInt(req.params.modelCarId)
    const videoId = parseInt(req.params.videoId)

    try {
        await ModelCar.deleteHasVideoRelationship(modelCarId, videoId)

        return sendResponse204(res)
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
