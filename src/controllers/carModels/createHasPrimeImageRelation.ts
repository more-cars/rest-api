import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {Image} from "../../models/images/Image"
import type {ImageNode} from "../../models/images/types/ImageNode"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function createHasPrimeImageRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await CarModel.createHasPrimeImageRelationship(carModelId, imageId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const relationshipPartner = await Image.findById(imageId)
        const marshalledData = marshalRelationship(relationship, relationshipPartner as ImageNode, 'image')

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
