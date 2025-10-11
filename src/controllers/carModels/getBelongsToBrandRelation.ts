import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {Brand} from "../../models/brands/Brand"
import type {BrandNode} from "../../models/brands/types/BrandNode"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getBelongsToBrandRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationship = await CarModel.getBelongsToBrandRelationship(carModelId)
        const relationshipPartner = await Brand.findById(relationship.brand_id)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as BrandNode, 'brand')

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            return sendResponse200(null, res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
