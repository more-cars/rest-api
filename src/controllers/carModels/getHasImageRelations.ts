import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {marshalRelationships} from "../relationships/marshalRelationships"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getHasImageRelations(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationships = await CarModel.getRelationshipsForHasImage(carModelId)
        const marshalledData = marshalRelationships(relationships, 'image')

        return sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse404(res)
    }
}
