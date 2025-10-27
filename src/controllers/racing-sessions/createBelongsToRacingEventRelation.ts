import express from "express"
import {RacingSession} from "../../models/racing-sessions/RacingSession"
import {marshalRelation} from "../relationships/marshalRelation"
import {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function createBelongsToRacingEventRelation(req: express.Request, res: express.Response) {
    const racingSessionId = parseInt(req.params.racingSessionId)
    const racingEventId = parseInt(req.params.racingEventId)

    try {
        const relation = await RacingSession.createBelongsToRacingEventRelationship(racingSessionId, racingEventId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.RACING_EVENT)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
