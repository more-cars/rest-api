import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshalHasCarModelRelationship} from "./marshalling/marshalHasCarModelRelationship"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getHasCarModelRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const brandId = parseInt(req.params.brandId)

    try {
        const relationship = await Brand.getRelationshipForHasCarModel(brandId, carModelId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const marshalledRelationship = marshalHasCarModelRelationship(relationship)

        sendResponse200(marshalledRelationship, res)
    } catch (e) {
        console.error(e)
        sendResponse404(res)
    }
}
