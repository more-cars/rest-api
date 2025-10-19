import express from "express"
import {Company} from "../../models/companies/Company"
import {marshalRelations} from "../relationships/marshalRelations"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getAllHasImageRelations(req: express.Request, res: express.Response) {
    const companyId = parseInt(req.params.companyId)

    try {
        const relations = await Company.getAllHasImageRelationships(companyId)
        const marshalledData = marshalRelations(relations, "image")

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
