import express from "express"
import {SessionResult} from "../../models/session-results/SessionResult"
import {marshalRelation} from "../relationships/marshalRelation"
import {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function createHasLapTimeRelation(req: express.Request, res: express.Response) {
    const sessionResultId = parseInt(req.params.sessionResultId)
    const lapTimeId = parseInt(req.params.lapTimeId)

    try {
        const relation = await SessionResult.createHasLapTimeRelationship(sessionResultId, lapTimeId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.LAP_TIME)

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
