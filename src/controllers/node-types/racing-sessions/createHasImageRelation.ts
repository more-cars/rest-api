import express from "express"
import {RacingSession} from "../../../models/node-types/racing-sessions/RacingSession"
import {marshalRelation} from "../../relations/marshalRelation"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createHasImageRelation(req: express.Request, res: express.Response) {
    const racingSessionId = parseInt(req.params.racingSessionId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relation = await RacingSession.createHasImageRelationship(racingSessionId, imageId)
        const marshalledData = marshalRelation(relation, ControllerNodeType.Image)

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
