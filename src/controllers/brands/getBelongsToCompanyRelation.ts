import express from "express"
import {Brand} from "../../models/brands/Brand"
import {Company} from "../../models/companies/Company"
import type {CompanyNode} from "../../models/companies/types/CompanyNode"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getBelongsToCompanyRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)

    try {
        const relationship = await Brand.getBelongsToCompanyRelationship(brandId)
        const relationshipPartner = await Company.findById(relationship.company_id)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as CompanyNode, 'company')

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
