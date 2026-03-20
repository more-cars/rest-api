import express from "express"
import {Price} from "../../../models/node-types/prices/Price"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function deleteForCarModelVariantRelation(req: express.Request, res: express.Response) {
    const priceId = parseInt(req.params.priceId)
    const carModelVariantId = parseInt(req.params.carModelVariantId)

    try {
        await Price.deleteForCarModelVariantRelationship(priceId, carModelVariantId)

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
