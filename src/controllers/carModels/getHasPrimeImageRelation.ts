import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {marshalRelation} from "../relationships/marshalRelation"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getHasPrimeImageRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relation = await CarModel.getHasPrimeImageRelationship(carModelId)
        const marshalledData = marshalRelation(relation, 'image')

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            return sendResponse200(null, res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
