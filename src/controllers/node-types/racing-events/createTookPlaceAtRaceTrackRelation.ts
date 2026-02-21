import express from "express"
import {RacingEvent} from "../../../models/node-types/racing-events/RacingEvent"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelation} from "../../relations/marshalRelation"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"

import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createTookPlaceAtRaceTrackRelation(req: express.Request, res: express.Response) {
    const racingEventId = parseInt(req.params.racingEventId)
    const raceTrackId = parseInt(req.params.raceTrackId)

    try {
        const modelRelation = await RacingEvent.createTookPlaceAtRaceTrackRelationship(racingEventId, raceTrackId)
        const relation = convertModelRelationToControllerRelation(modelRelation)
        const marshalledData = marshalRelation(relation)

        return sendResponse201(marshalledData, res)
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
