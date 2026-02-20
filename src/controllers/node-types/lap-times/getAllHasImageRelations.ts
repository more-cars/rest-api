import express from "express"
import {LapTime} from "../../../models/node-types/lap-times/LapTime"
import {marshalRelations} from "../../relations/marshalRelations"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllHasImageRelations(req: express.Request, res: express.Response) {
    const lapTimeId = parseInt(req.params.lapTimeId)

    try {
        const relations = await LapTime.getAllHasImageRelationships(lapTimeId)
        const marshalledData = marshalRelations(relations, ControllerNodeType.IMAGE)

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
