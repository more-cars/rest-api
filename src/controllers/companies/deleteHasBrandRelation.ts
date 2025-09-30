import express from "express"
import {Company} from "../../models/companies/Company"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse204} from "../responses/sendResponse204"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function deleteHasBrandRelation(req: express.Request, res: express.Response) {
    const companyId = parseInt(req.params.companyId)
    const brandId = parseInt(req.params.brandId)

    try {
        await Company.deleteHasBrandRelationship(companyId, brandId)
        sendResponse204(res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            sendResponse404(res)
        } else {
            console.error(e)
            sendResponse500(res)
        }
    }
}
