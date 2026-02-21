import express from "express"
import {LapTime} from "../../../models/node-types/lap-times/LapTime"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelation} from "../../relations/marshalRelation"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAchievedOnTrackLayoutRelation(req: express.Request, res: express.Response) {
    const lapTimeId = parseInt(req.params.lapTimeId)

    try {
        const modelRelation = await LapTime.getAchievedOnTrackLayoutRelationship(lapTimeId)
        const relation = convertModelRelationToControllerRelation(modelRelation)
        const marshalledData = marshalRelation(relation)

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
