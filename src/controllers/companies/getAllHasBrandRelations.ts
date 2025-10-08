import express from "express"
import {Company} from "../../models/companies/Company"
import {marshalHasBrandRelationships} from "./marshalling/marshalHasBrandRelationships"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getAllHasBrandRelations(req: express.Request, res: express.Response) {
    const companyId = parseInt(req.params.companyId)

    try {
        const relationships = await Company.getAllHasBrandRelationships(companyId)
        const marshalledData = marshalHasBrandRelationships(relationships)
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
