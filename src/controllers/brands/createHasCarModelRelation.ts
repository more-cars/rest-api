import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshalRelationship} from "./marshalRelationship"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse422} from "../responses/sendResponse422"

export async function createHasCarModelRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const brandId = parseInt(req.params.brandId)

    try {
        const relationship = await Brand.createHasCarModelRelationship(brandId, carModelId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const marshalledData = marshalRelationship(relationship)

        sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        sendResponse422(res)
    }
}
