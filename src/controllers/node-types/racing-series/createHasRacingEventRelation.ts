import express from "express"
import {RacingSeries} from "../../../models/node-types/racing-series/RacingSeries"
import {marshalRelation} from "../../relations/marshalRelation"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../models/types/RelationshipAlreadyExistsError"

import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createHasRacingEventRelation(req: express.Request, res: express.Response) {
    const racingSeriesId = parseInt(req.params.racingSeriesId)
    const racingEventId = parseInt(req.params.racingEventId)

    try {
        const relation = await RacingSeries.createHasRacingEventRelationship(racingSeriesId, racingEventId)
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
