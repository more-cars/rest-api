import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {Brand} from "../../models/brands/Brand"
import type {BrandNode} from "../../models/brands/types/BrandNode"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse422} from "../responses/sendResponse422"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"

export async function createBelongsToBrandRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const brandId = parseInt(req.params.brandId)

    try {
        const relationship = await CarModel.createBelongsToBrandRelationship(carModelId, brandId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const relationshipPartner = await Brand.findById(brandId)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as BrandNode, 'brand')

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse422(res)
    }
}
