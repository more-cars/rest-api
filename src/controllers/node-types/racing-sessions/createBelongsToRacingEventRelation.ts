import express from "express"
import {RacingSession} from "../../../models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createBelongsToRacingEventRelation(req: express.Request, res: express.Response) {
    const racingSessionId = parseInt(req.params.racingSessionId)
    const racingEventId = parseInt(req.body?.data?.id)

    try {
        await RacingSession.createBelongsToRacingEventRelationship(racingSessionId, racingEventId)
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
