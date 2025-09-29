import express from "express"
import {Company} from "../../models/companies/Company"
import {marshalHasPrimeImageRelationship} from "./marshalling/marshalHasPrimeImageRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function createHasPrimeImageRelation(req: express.Request, res: express.Response) {
    const companyId = parseInt(req.params.companyId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await Company.createHasPrimeImageRelationship(companyId, imageId)
        const marshalledData = marshalHasPrimeImageRelationship(relationship)
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
