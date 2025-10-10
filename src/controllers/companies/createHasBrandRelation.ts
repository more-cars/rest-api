import express from "express"
import {Company} from "../../models/companies/Company"
import {Brand} from "../../models/brands/Brand"
import type {BrandNode} from "../../models/brands/types/BrandNode"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"

export async function createHasBrandRelation(req: express.Request, res: express.Response) {
    const companyId = parseInt(req.params.companyId)
    const brandId = parseInt(req.params.brandId)

    try {
        const relationship = await Company.createHasBrandRelationship(companyId, brandId)
        const relationshipPartner = await Brand.findById(brandId)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as BrandNode, 'brand')
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
