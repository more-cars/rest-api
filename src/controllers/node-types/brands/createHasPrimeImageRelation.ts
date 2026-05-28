import express from "express"
import {Brand} from "../../../models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createHasPrimeImageRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const imageId = parseInt(req.body?.data?.id)

    try {
        await Brand.createHasPrimeImageRelationship(brandId, imageId)
        return sendResponse204(res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
