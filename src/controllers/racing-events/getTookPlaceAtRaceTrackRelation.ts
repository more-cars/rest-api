import express from "express"
import {RacingEvent} from "../../models/racing-events/RacingEvent"
import {marshalRelation} from "../relationships/marshalRelation"
import {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getTookPlaceAtRaceTrackRelation(req: express.Request, res: express.Response) {
    const racingEventId = parseInt(req.params.racingEventId)

    try {
        const relation = await RacingEvent.getTookPlaceAtRaceTrackRelationship(racingEventId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.RACE_TRACK)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            return sendResponse200(null, res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
