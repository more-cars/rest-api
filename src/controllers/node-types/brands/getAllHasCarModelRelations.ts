import express from "express"
import {Brand} from "../../../models/node-types/brands/Brand"
import {marshalRelations} from "../../relations/marshalRelations"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllHasCarModelRelations(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)

    try {
        const relations = await Brand.getAllHasCarModelRelationships(brandId)
        const marshalledData = marshalRelations(relations, NodeTypeEnum.CAR_MODEL)

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
