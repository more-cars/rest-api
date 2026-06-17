import express from "express"
import {LapTime} from "../../../models/node-types/lap-times/LapTime"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelations} from "../../relations/marshalRelations"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {RelationType} from "../../types/RelationType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllHasVideoRelations(req: express.Request, res: express.Response) {
    const lapTimeId = parseInt(req.params.lapTimeId)

    try {
        const modelRelations = await LapTime.getAllHasVideoRelationships(lapTimeId)
        const relations = modelRelations.map(relation => convertModelRelationToControllerRelation(relation))
        const marshalledData = marshalRelations(relations, ControllerNodeType.LapTime, lapTimeId, RelationType.LapTimeHasVideo)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            return sendResponse500(res)
        }
    }
}
