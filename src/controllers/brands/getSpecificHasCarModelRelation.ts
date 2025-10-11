import express from "express"
import {Brand} from "../../models/brands/Brand"
import {CarModel} from "../../models/car-models/CarModel"
import type {CarModelNode} from "../../models/car-models/types/CarModelNode"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse500} from "../responses/sendResponse500"

export async function getSpecificHasCarModelRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationship = await Brand.getSpecificHasCarModelRelationship(brandId, carModelId)
        const relationshipPartner = await CarModel.findById(relationship.car_model_id)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as CarModelNode, 'car model')

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
