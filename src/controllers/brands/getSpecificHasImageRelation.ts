import express from "express"
import {Brand} from "../../models/brands/Brand"
import {Image} from "../../models/images/Image"
import type {ImageNode} from "../../models/images/types/ImageNode"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"

export async function getSpecificHasImageRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await Brand.getRelationshipForHasImage(brandId, imageId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const relationshipPartner = await Image.findById(relationship.image_id)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as ImageNode, 'image')

        return sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse404(res)
    }
}
