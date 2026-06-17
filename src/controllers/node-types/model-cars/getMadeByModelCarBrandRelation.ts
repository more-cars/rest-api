import express from "express"
import {ModelCar} from "../../../models/node-types/model-cars/ModelCar"
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

export async function getMadeByModelCarBrandRelation(req: express.Request, res: express.Response) {
    const modelCarId = parseInt(req.params.modelCarId)

    try {
        const modelRelation = await ModelCar.getMadeByModelCarBrandRelationship(modelCarId)
        const relation = convertModelRelationToControllerRelation(modelRelation)
        const marshalledData = marshalSingleRelation(relation)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelNotFoundError) {
            const marshalledData = marshalEmptyRelation(ControllerNodeType.ModelCar, modelCarId, RelationType.ModelCarMadeByModelCarBrand)
            return sendResponse200(marshalledData, res)
        } else {
            return sendResponse500(res)
        }
    }
}
