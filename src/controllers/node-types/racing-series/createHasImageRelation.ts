import express from "express"
import {RacingSeries} from "../../../models/node-types/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createHasImageRelation(req: express.Request, res: express.Response) {
    const racingSeriesId = parseInt(req.params.racingSeriesId)
    const imageId = parseInt(req.body?.data?.id)

    try {
        await RacingSeries.createHasImageRelationship(racingSeriesId, imageId)
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
