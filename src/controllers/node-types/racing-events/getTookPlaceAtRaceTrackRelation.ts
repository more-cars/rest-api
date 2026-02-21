import express from "express"
import {RacingEvent} from "../../../models/node-types/racing-events/RacingEvent"
import {marshalRelation} from "../../relations/marshalRelation"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getTookPlaceAtRaceTrackRelation(req: express.Request, res: express.Response) {
    const racingEventId = parseInt(req.params.racingEventId)

    try {
        const relation = await RacingEvent.getTookPlaceAtRaceTrackRelationship(racingEventId)
        const marshalledData = marshalRelation(relation, ControllerNodeType.RaceTrack)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelNotFoundError) {
            return sendResponse200(null, res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
