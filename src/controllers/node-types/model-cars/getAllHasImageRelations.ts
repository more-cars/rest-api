import express from "express"
import {ModelCar} from "../../../models/node-types/model-cars/ModelCar"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelations} from "../../relations/marshalRelations"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {RelationType} from "../../types/RelationType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllHasImageRelations(req: express.Request, res: express.Response) {
    const modelCarId = parseInt(req.params.modelCarId)

    try {
        const modelRelations = await ModelCar.getAllHasImageRelationships(modelCarId)
        const relations = modelRelations.map(relation => convertModelRelationToControllerRelation(relation))
        const marshalledData = marshalRelations(relations, ControllerNodeType.ModelCar, modelCarId, RelationType.ModelCarHasImage)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            return sendResponse500(res)
        }
    }
}
