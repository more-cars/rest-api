import express from "express"
import {ModelCarBrand} from "../../../models/node-types/model-car-brands/ModelCarBrand"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalSingleRelation} from "../../relations/marshalSingleRelation"
import {marshalEmptyRelation} from "../../relations/marshalEmptyRelation"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {RelationType} from "../../types/RelationType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getHasMainVideoRelation(req: express.Request, res: express.Response) {
    const modelCarBrandId = parseInt(req.params.modelCarBrandId)

    try {
        const modelRelation = await ModelCarBrand.getHasMainVideoRelationship(modelCarBrandId)
        const relation = convertModelRelationToControllerRelation(modelRelation)
        const marshalledData = marshalSingleRelation(relation)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelNotFoundError) {
            const marshalledData = marshalEmptyRelation(ControllerNodeType.ModelCarBrand, modelCarBrandId, RelationType.ModelCarBrandHasMainVideo)
            return sendResponse200(marshalledData, res)
        } else {
            return sendResponse500(res)
        }
    }
}
