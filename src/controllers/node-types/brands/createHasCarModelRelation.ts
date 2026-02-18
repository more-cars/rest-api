import express from "express"
import {Brand} from "../../../models/brands/Brand"
import {marshalRelation} from "../../relationships/marshalRelation"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../models/types/RelationshipAlreadyExistsError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createHasCarModelRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relation = await Brand.createHasCarModelRelationship(brandId, carModelId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.CAR_MODEL)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
