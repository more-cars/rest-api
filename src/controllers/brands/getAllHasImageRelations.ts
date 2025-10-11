import express from "express"
import {Brand} from "../../models/brands/Brand"
import {Image} from "../../models/images/Image"
import type {ImageNode} from "../../models/images/types/ImageNode"
import {marshalRelationships} from "../relationships/marshalRelationships"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"

export async function getAllHasImageRelations(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)

    try {
        const relationships = await Brand.getRelationshipsForHasImage(brandId)
        for (const relationship of relationships) {
            relationship.relationship_partner = await Image.findById(relationship.image_id) as ImageNode
        }
        const marshalledData = marshalRelationships(relationships as BaseRelationship[], "image")

        return sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse404(res)
    }
}
