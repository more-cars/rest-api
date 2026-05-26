import express from "express"
import {RacingEvent} from "../../../models/node-types/racing-events/RacingEvent"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelations} from "../../relations/marshalRelations"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {RelationType} from "../../types/RelationType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllCoveredByMagazineIssueRelations(req: express.Request, res: express.Response) {
    const racingEventId = parseInt(req.params.racingEventId)

    try {
        const modelRelations = await RacingEvent.getAllCoveredByMagazineIssueRelationships(racingEventId)
        const relations = modelRelations.map(relation => convertModelRelationToControllerRelation(relation))
        const marshalledData = marshalRelations(relations, ControllerNodeType.RacingEvent, racingEventId, RelationType.RacingEventCoveredByMagazineIssue)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
