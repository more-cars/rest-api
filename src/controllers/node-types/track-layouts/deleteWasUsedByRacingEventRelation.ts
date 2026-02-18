import express from "express"
import {TrackLayout} from "../../../models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../models/types/RelationshipNotFoundError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function deleteWasUsedByRacingEventRelation(req: express.Request, res: express.Response) {
    const trackLayoutId = parseInt(req.params.trackLayoutId)
    const racingEventId = parseInt(req.params.racingEventId)

    try {
        await TrackLayout.deleteWasUsedByRacingEventRelationship(trackLayoutId, racingEventId)

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
