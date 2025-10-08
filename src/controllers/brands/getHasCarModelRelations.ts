import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshalHasCarModelRelationships} from "./marshalling/marshalHasCarModelRelationships"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"

export async function getHasCarModelRelations(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)

    try {
        const relationships = await Brand.getRelationshipsForHasCarModel(brandId)
        const marshalledRelationships = marshalHasCarModelRelationships(relationships)

        return sendResponse200(marshalledRelationships, res)
    } catch (e) {
        console.error(e)
        return sendResponse404(res)
    }
}
