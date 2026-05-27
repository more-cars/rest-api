import express from "express"
import {Node} from "../../models/Node"
import {convertModelRelationToControllerRelation} from "../relations/convertModelRelationToControllerRelation"
import type {RelationResponseItem} from "../types/RelationResponseItem"
import {RelationType} from "../types/RelationType"
import type {RelationCollectionResponse} from "../types/RelationCollectionResponse"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse500} from "../responses/sendResponse500"

export async function getNodesPrimeImage(req: express.Request, res: express.Response) {
    const nodeIds = req.params.ids.split(',').map(id => Number(id))

    try {
        const modelRelations = await Node.findPrimeImages(nodeIds)
        const relations = modelRelations.map(relation => convertModelRelationToControllerRelation(relation))

        const items: RelationResponseItem[] = []

        for (const relation of relations) {
            const {id, ...attributes} = relation.to_node.fields
            items.push({
                type: relation.to_node.node_type,
                id,
                attributes,
            })
        }

        const marshalledData = {
            links: {
                self: `/nodes/${nodeIds.join(',')}/${RelationType.NodeHasPrimeImage}`,
            },
            data: items,
        } satisfies RelationCollectionResponse

        return sendResponse200(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}
