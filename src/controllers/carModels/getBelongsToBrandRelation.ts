import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {marshalBelongsToBrandRelationship} from "./marshalling/marshalBelongsToBrandRelationship"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getBelongsToBrandRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationship = await CarModel.getRelationshipForBelongsToBrand(carModelId)

        if (!relationship) {
            return sendResponse200(null, res)
        } else {
            return sendResponse200(marshalBelongsToBrandRelationship(relationship), res)
        }
    } catch (e) {
        console.error(e)
        return sendResponse404(res)
    }
}
