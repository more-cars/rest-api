import express from "express"
import {MotorShow} from "../../../models/node-types/motor-shows/MotorShow"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelations} from "../../relations/marshalRelations"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {RelationType} from "../../types/RelationType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllPresentsCarModelVariantRelations(req: express.Request, res: express.Response) {
    const motorShowId = parseInt(req.params.motorShowId)

    try {
        const modelRelations = await MotorShow.getAllPresentsCarModelVariantRelationships(motorShowId)
        const relations = modelRelations.map(relation => convertModelRelationToControllerRelation(relation))
        const marshalledData = marshalRelations(relations, ControllerNodeType.MotorShow, motorShowId, RelationType.MotorShowPresentsCarModelVariant)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            return sendResponse500(res)
        }
    }
}
