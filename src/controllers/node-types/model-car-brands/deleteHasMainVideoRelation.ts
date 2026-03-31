import express from "express"
import {ModelCarBrand} from "../../../models/node-types/model-car-brands/ModelCarBrand"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function deleteHasMainVideoRelation(req: express.Request, res: express.Response) {
    const modelCarBrandId = parseInt(req.params.modelCarBrandId)
    const videoId = parseInt(req.params.videoId)

    try {
        await ModelCarBrand.deleteHasMainVideoRelationship(modelCarBrandId, videoId)

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
