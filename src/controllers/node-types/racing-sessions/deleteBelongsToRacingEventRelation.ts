import express from "express"
import {RacingSession} from "../../../models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../models/types/RelationshipNotFoundError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function deleteBelongsToRacingEventRelation(req: express.Request, res: express.Response) {
    const racingSessionId = parseInt(req.params.racingSessionId)
    const racingEventId = parseInt(req.params.racingEventId)

    try {
        await RacingSession.deleteBelongsToRacingEventRelationship(racingSessionId, racingEventId)

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
