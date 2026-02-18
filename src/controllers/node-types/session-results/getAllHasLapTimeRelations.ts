import express from "express"
import {SessionResult} from "../../../models/session-results/SessionResult"
import {marshalRelations} from "../../relations/marshalRelations"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllHasLapTimeRelations(req: express.Request, res: express.Response) {
    const sessionResultId = parseInt(req.params.sessionResultId)

    try {
        const relations = await SessionResult.getAllHasLapTimeRelationships(sessionResultId)
        const marshalledData = marshalRelations(relations, NodeTypeEnum.LAP_TIME)

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
