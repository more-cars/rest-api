import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshalHasCarModelRelationship} from "./marshalling/marshalHasCarModelRelationship"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse404} from "../responses/sendResponse404"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse500} from "../responses/sendResponse500"

export async function createHasCarModelRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationship = await Brand.createHasCarModelRelationship(brandId, carModelId)
        const marshalledData = marshalHasCarModelRelationship(relationship)
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
