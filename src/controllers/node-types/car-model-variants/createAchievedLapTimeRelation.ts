import express from "express"
import {CarModelVariant} from "../../../models/node-types/car-model-variants/CarModelVariant"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelation} from "../../relations/marshalRelation"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createAchievedLapTimeRelation(req: express.Request, res: express.Response) {
    const carModelVariantId = parseInt(req.params.carModelVariantId)
    const lapTimeId = parseInt(req.params.lapTimeId)

    try {
        const modelRelation = await CarModelVariant.createAchievedLapTimeRelationship(carModelVariantId, lapTimeId)
        const relation = convertModelRelationToControllerRelation(modelRelation)
        const marshalledData = marshalRelation(relation)

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
