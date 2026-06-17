import express from "express"
import {Brand} from "../../../models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createHasVideoRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const videoId = parseInt(req.body?.data?.id)

    try {
        await Brand.createHasVideoRelationship(brandId, videoId)
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
