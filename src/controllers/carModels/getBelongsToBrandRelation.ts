import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {Brand} from "../../models/brands/Brand"
import type {BrandNode} from "../../models/brands/types/BrandNode"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getBelongsToBrandRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationship = await CarModel.getRelationshipForBelongsToBrand(carModelId)

        if (!relationship) {
            return sendResponse200(null, res)
        } else {
            const relationshipPartner = await Brand.findById(relationship.brand_id)
            const marshalledData = marshalRelationship(relationship, relationshipPartner as BrandNode, 'brand')
            return sendResponse200(marshalledData, res)
        }
    } catch (e) {
        console.error(e)
        return sendResponse404(res)
    }
}
