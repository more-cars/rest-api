import express from "express"
import {Programme} from "../../../models/node-types/programmes/Programme"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function deleteHasMainVideoRelation(req: express.Request, res: express.Response) {
    const programmeId = parseInt(req.params.programmeId)
    const videoId = parseInt(req.params.videoId)

    try {
        await Programme.deleteHasMainVideoRelationship(programmeId, videoId)

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
