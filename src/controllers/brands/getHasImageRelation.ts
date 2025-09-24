import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshalHasImageRelationship} from "./marshalling/marshalHasImageRelationship"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getHasImageRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await Brand.getRelationshipForHasImage(brandId, imageId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const marshalledRelationship = marshalHasImageRelationship(relationship)

        sendResponse200(marshalledRelationship, res)
    } catch (e) {
        console.error(e)
        sendResponse404(res)
    }
}
