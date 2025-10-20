import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshalRelation} from "../relationships/marshalRelation"
import {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getBelongsToCompanyRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)

    try {
        const relation = await Brand.getBelongsToCompanyRelationship(brandId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.COMPANY)

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
