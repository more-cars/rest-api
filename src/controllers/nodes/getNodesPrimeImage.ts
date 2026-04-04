import express from "express"
import {Node} from "../../models/Node"
import {convertModelRelationToControllerRelation} from "../relations/convertModelRelationToControllerRelation"
import {marshalRelations} from "../relations/marshalRelations"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse500} from "../responses/sendResponse500"

export async function getNodesPrimeImage(req: express.Request, res: express.Response) {
    const nodeIds = req.params.ids.split(',').map(id => Number(id))

    try {
        const modelRelations = await Node.findPrimeImages(nodeIds)
        const relations = modelRelations.map(relation => convertModelRelationToControllerRelation(relation))
        const marshalledData = marshalRelations(relations)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
