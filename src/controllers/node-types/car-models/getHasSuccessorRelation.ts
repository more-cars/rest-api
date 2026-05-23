import express from "express"
import {CarModel} from "../../../models/node-types/car-models/CarModel"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalSingleRelation} from "../../relations/marshalSingleRelation"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"
import {marshalEmptyRelation} from "../../relations/marshalEmptyRelation"
import {RelationType} from "../../types/RelationType"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export async function getHasSuccessorRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)

    try {
        const modelRelation = await CarModel.getHasSuccessorRelationship(carModelId)
        const relation = convertModelRelationToControllerRelation(modelRelation)
        const marshalledData = marshalSingleRelation(relation)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelNotFoundError) {
            const marshalledData = marshalEmptyRelation(ControllerNodeType.CarModel, carModelId, RelationType.CarModelHasSuccessor)
            return sendResponse200(marshalledData, res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
