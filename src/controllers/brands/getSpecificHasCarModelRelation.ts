import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshalRelation} from "../relationships/marshalRelation"
import {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getSpecificHasCarModelRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relation = await Brand.getSpecificHasCarModelRelationship(brandId, carModelId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.CAR_MODEL)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
