import express from "express"
import {SessionResult} from "../../../models/node-types/session-results/SessionResult"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalSingleRelation} from "../../relations/marshalSingleRelation"
import {marshalEmptyRelation} from "../../relations/marshalEmptyRelation"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {RelationType} from "../../types/RelationType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getBelongsToRacingSessionRelation(req: express.Request, res: express.Response) {
    const sessionResultId = parseInt(req.params.sessionResultId)

    try {
        const modelRelation = await SessionResult.getBelongsToRacingSessionRelationship(sessionResultId)
        const relation = convertModelRelationToControllerRelation(modelRelation)
        const marshalledData = marshalSingleRelation(relation)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelNotFoundError) {
            const marshalledData = marshalEmptyRelation(ControllerNodeType.SessionResult, sessionResultId, RelationType.SessionResultBelongsToRacingSession)
            return sendResponse200(marshalledData, res)
        } else {
            return sendResponse500(res)
        }
    }
}
