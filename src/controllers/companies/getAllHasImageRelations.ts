import express from "express"
import {Company} from "../../models/companies/Company"
import {Image} from "../../models/images/Image"
import type {ImageNode} from "../../models/images/types/ImageNode"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationships} from "../relationships/marshalRelationships"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getAllHasImageRelations(req: express.Request, res: express.Response) {
    const companyId = parseInt(req.params.companyId)

    try {
        const relationships = await Company.getAllHasImageRelationships(companyId)
        for (const relationship of relationships) {
            relationship.relationship_partner = await Image.findById(relationship.image_id) as ImageNode
        }
        const marshalledData = marshalRelationships(relationships as BaseRelationship[], "image")

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
