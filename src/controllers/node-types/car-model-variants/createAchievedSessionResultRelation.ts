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

export async function createAchievedSessionResultRelation(req: express.Request, res: express.Response) {
    const carModelVariantId = parseInt(req.params.carModelVariantId)
    const sessionResultId = parseInt(req.params.sessionResultId)

    try {
        const modelRelation = await CarModelVariant.createAchievedSessionResultRelationship(carModelVariantId, sessionResultId)
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
