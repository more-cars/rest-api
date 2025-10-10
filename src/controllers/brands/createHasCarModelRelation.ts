import express from "express"
import {Brand} from "../../models/brands/Brand"
import {CarModel} from "../../models/car-models/CarModel"
import type {CarModelNode} from "../../models/car-models/types/CarModelNode"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function createHasCarModelRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationship = await Brand.createHasCarModelRelationship(brandId, carModelId)
        const relationshipPartner = await CarModel.findById(carModelId)
        const marshalledData = marshalRelationship(relationship, relationshipPartner as CarModelNode, 'car model')
        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
