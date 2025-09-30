import express from "express"
import {Company} from "../../models/companies/Company"
import {marshalHasImageRelationship} from "./marshalling/marshalHasImageRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function createHasImageRelation(req: express.Request, res: express.Response) {
    const companyId = parseInt(req.params.companyId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await Company.createHasImageRelationship(companyId, imageId)
        const marshalledData = marshalHasImageRelationship(relationship)
        sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            sendResponse404(res)
        } else if (e instanceof RelationshipAlreadyExistsError) {
            sendResponse304(res)
        } else {
            console.error(e)
            sendResponse500(res)
        }
    }
}
