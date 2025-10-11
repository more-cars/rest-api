import express from "express"
import {Brand} from "../../models/brands/Brand"
import {CarModel} from "../../models/car-models/CarModel"
import type {CarModelNode} from "../../models/car-models/types/CarModelNode"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"

export async function getSpecificHasCarModelRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationship = await Brand.getSpecificHasCarModelRelationship(brandId, carModelId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const relationshipPartner = await CarModel.findById(relationship.car_model_id)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as CarModelNode, 'car model')

        return sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse404(res)
    }
}
