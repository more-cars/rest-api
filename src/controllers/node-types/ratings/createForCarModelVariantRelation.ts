import express from "express"
import {Rating} from "../../../models/node-types/ratings/Rating"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createForCarModelVariantRelation(req: express.Request, res: express.Response) {
    const ratingId = parseInt(req.params.ratingId)
    const carModelVariantId = parseInt(req.body?.data?.id)

    try {
        await Rating.createForCarModelVariantRelationship(ratingId, carModelVariantId)
        return sendResponse204(res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            return sendResponse500(res)
        }
    }
}
