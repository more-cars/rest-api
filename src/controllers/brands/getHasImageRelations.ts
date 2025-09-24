import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshalHasImageRelationships} from "./marshalling/marshalHasImageRelationships"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getHasImageRelations(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)

    try {
        const relationships = await Brand.getRelationshipsForHasImage(brandId)
        const marshalledRelationships = marshalHasImageRelationships(relationships)

        sendResponse200(marshalledRelationships, res)
    } catch (e) {
        console.error(e)
        sendResponse404(res)
    }
}
