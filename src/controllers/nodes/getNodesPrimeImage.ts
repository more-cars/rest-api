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
                data: {
                    relationship_id: relation.id,
                    relationship_name: relation.type,
                    start_node: {
                        node_type: relation.from_node.node_type,
                        data: relation.from_node.fields,
                    },
                    partner_node: {
                        node_type: relation.to_node.node_type,
                        data: relation.to_node.fields,
                    },
                    created_at: relation.created_at,
                    updated_at: relation.updated_at,
                }
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
