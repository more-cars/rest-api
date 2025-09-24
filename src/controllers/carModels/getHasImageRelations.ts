import express from "express"
import {marshalHasImageRelationships} from "./marshalling/marshalHasImageRelationships"
import {CarModel} from "../../models/car-models/CarModel"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getHasImageRelations(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationships = await CarModel.getRelationshipsForHasImage(carModelId)
        const marshalledRelationships = marshalHasImageRelationships(relationships)

        sendResponse200(marshalledRelationships, res)
    } catch (e) {
        console.error(e)
        sendResponse404(res)
    }
}
