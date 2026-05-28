import express from "express"
import {CarModel} from "../../../models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {SemanticError} from "../../../models/types/SemanticError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"
import {sendResponse422} from "../../responses/sendResponse422"

export async function createIsSuccessorOfRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const partnerId = parseInt(req.body?.data?.id)

    try {
        await CarModel.createIsSuccessorOfRelationship(carModelId, partnerId)
        return sendResponse204(res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof SemanticError) {
            return sendResponse422(res)
        } else if (e instanceof RelAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
