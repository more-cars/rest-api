import express from "express"
import {Brand} from "../../models/brands/Brand"
import {Image} from "../../models/images/Image"
import type {ImageNode} from "../../models/images/types/ImageNode"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getHasPrimeImageRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)

    try {
        const relationship = await Brand.getHasPrimeImageRelationship(brandId)
        const relationshipPartner = await Image.findById(relationship.image_id)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as ImageNode, 'image')

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            return sendResponse200(null, res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
