import express from "express"
import {CarModel} from "../../../models/node-types/car-models/CarModel"
import {marshalRelation} from "../../relations/marshalRelation"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createHasVariantRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const carModelVariantId = parseInt(req.params.carModelVariantId)

    try {
        const relation = await CarModel.createHasVariantRelationship(carModelId, carModelVariantId)
        const marshalledData = marshalRelation(relation, ControllerNodeType.CarModelVariant)

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
