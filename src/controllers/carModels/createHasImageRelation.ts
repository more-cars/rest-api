import express from "express"
import {marshalHasImageRelationship} from "./marshalling/marshalHasImageRelationship"
import {CarModel} from "../../models/car-models/CarModel"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse422} from "../responses/sendResponse422"

export async function createHasImageRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await CarModel.createHasImageRelationship(carModelId, imageId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const marshalledData = marshalHasImageRelationship(relationship)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse422(res)
    }
}
