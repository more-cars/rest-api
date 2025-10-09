import express from "express"
import {Brand} from "../../models/brands/Brand"
import {CarModel} from "../../models/car-models/CarModel"
import type {CarModelNode} from "../../models/car-models/types/CarModelNode"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getHasCarModelRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const brandId = parseInt(req.params.brandId)

    try {
        const relationship = await Brand.getRelationshipForHasCarModel(brandId, carModelId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const relationshipPartner = await CarModel.findById(relationship.car_model_id)
        const marshalledData = marshalRelationship(relationship, relationshipPartner as CarModelNode, 'car model')

        return sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse404(res)
    }
}
