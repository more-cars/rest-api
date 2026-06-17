import express from "express"
import {CarModelVariant} from "../../../models/node-types/car-model-variants/CarModelVariant"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelations} from "../../relations/marshalRelations"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {RelationType} from "../../types/RelationType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllHasScaleModelRelations(req: express.Request, res: express.Response) {
    const carModelVariantId = parseInt(req.params.carModelVariantId)

    try {
        const modelRelations = await CarModelVariant.getAllHasScaleModelRelationships(carModelVariantId)
        const relations = modelRelations.map(relation => convertModelRelationToControllerRelation(relation))
        const marshalledData = marshalRelations(relations, ControllerNodeType.CarModelVariant, carModelVariantId, RelationType.CarModelVariantHasScaleModel)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            return sendResponse500(res)
        }
    }
}
