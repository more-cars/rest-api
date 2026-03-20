import express from "express"
import {ModelCarBrand} from "../../../models/node-types/model-car-brands/ModelCarBrand"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelations} from "../../relations/marshalRelations"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllCreatedModelCarRelations(req: express.Request, res: express.Response) {
    const modelCarBrandId = parseInt(req.params.modelCarBrandId)

    try {
        const modelRelations = await ModelCarBrand.getAllCreatedModelCarRelationships(modelCarBrandId)
        const relations = modelRelations.map(relation => convertModelRelationToControllerRelation(relation))
        const marshalledData = marshalRelations(relations)

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
