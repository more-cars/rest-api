import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {marshalHasPrimeImageRelationship} from "./marshalling/marshalHasPrimeImageRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function hasHasPrimeImageRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await CarModel.hasHasPrimeImageRelationship(carModelId, imageId)
        const marshalledData = marshalHasPrimeImageRelationship(relationship)
        sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            sendResponse404(res)
        } else {
            console.error(e)
            sendResponse500(res)
        }
    }
}
