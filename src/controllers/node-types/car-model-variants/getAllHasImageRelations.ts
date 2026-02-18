import express from "express"
import {CarModelVariant} from "../../../models/node-types/car-model-variants/CarModelVariant"
import {marshalRelations} from "../../relations/marshalRelations"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllHasImageRelations(req: express.Request, res: express.Response) {
    const carModelVariantId = parseInt(req.params.carModelVariantId)

    try {
        const relations = await CarModelVariant.getAllHasImageRelationships(carModelVariantId)
        const marshalledData = marshalRelations(relations, NodeTypeEnum.IMAGE)

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
