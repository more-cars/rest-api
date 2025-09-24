import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {marshalHasImageRelationship} from "./marshalling/marshalHasImageRelationship"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getHasImageRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await CarModel.getRelationshipForHasImage(carModelId, imageId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const marshalledRelationship = marshalHasImageRelationship(relationship)

        sendResponse200(marshalledRelationship, res)
    } catch (e) {
        console.error(e)
        sendResponse404(res)
    }
}
