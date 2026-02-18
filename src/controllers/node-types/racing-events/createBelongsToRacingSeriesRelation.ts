import express from "express"
import {RacingEvent} from "../../../models/racing-events/RacingEvent"
import {marshalRelation} from "../../relationships/marshalRelation"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../models/types/RelationshipAlreadyExistsError"

import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createBelongsToRacingSeriesRelation(req: express.Request, res: express.Response) {
    const racingEventId = parseInt(req.params.racingEventId)
    const racingSeriesId = parseInt(req.params.racingSeriesId)

    try {
        const relation = await RacingEvent.createBelongsToRacingSeriesRelationship(racingEventId, racingSeriesId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.RACING_SERIES)

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
