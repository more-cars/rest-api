import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {Image} from "../../models/images/Image"
import type {ImageNode} from "../../models/images/types/ImageNode"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse422} from "../responses/sendResponse422"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"

export async function createHasImageRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await CarModel.createHasImageRelationship(carModelId, imageId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const relationshipPartner = await Image.findById(imageId)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as ImageNode, 'image')

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse422(res)
    }
}
