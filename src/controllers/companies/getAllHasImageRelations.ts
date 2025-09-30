import express from "express"
import {Company} from "../../models/companies/Company"
import {marshalHasImageRelationships} from "./marshalling/marshalHasImageRelationships"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getAllHasImageRelations(req: express.Request, res: express.Response) {
    const companyId = parseInt(req.params.companyId)

    try {
        const relationships = await Company.getAllHasImageRelationships(companyId)
        const marshalledData = marshalHasImageRelationships(relationships)
        sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            sendResponse404(res)
        } else {
            console.error(e)
            sendResponse500(res)
        }
    }
}
