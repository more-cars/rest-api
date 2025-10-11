import express from "express"
import {Brand} from "../../models/brands/Brand"
import {CarModel} from "../../models/car-models/CarModel"
import type {CarModelNode} from "../../models/car-models/types/CarModelNode"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationships} from "../relationships/marshalRelationships"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getAllHasCarModelRelations(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)

    try {
        const relationships = await Brand.getAllHasCarModelRelationships(brandId)
        for (const relationship of relationships) {
            relationship.relationship_partner = await CarModel.findById(relationship.car_model_id) as CarModelNode
        }
        const marshalledData = marshalRelationships(relationships as BaseRelationship[], "car model")

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
