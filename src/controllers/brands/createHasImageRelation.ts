import express from "express"
import {Brand} from "../../models/brands/Brand"
import {Image} from "../../models/images/Image"
import type {ImageNode} from "../../models/images/types/ImageNode"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse422} from "../responses/sendResponse422"

export async function createHasImageRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await Brand.createHasImageRelationship(brandId, imageId)

        if (!relationship) {
            return sendResponse404(res)
        }

        const relationshipPartner = await Image.findById(imageId)
        const marshalledData = marshalRelationship(relationship, relationshipPartner as ImageNode, 'image')

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse422(res)
    }
}
