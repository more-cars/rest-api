import express from "express"
import {CarModelVariant} from "../../models/car-model-variants/CarModelVariant"
import {marshalRelation} from "../relationships/marshalRelation"
import {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function createAchievedSessionResultRelation(req: express.Request, res: express.Response) {
    const carModelVariantId = parseInt(req.params.carModelVariantId)
    const sessionResultId = parseInt(req.params.sessionResultId)

    try {
        const relation = await CarModelVariant.createAchievedSessionResultRelationship(carModelVariantId, sessionResultId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.SESSION_RESULT)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
