import express from "express"
import {Node} from "../../models/Node"
import type {RelationResponseItem} from "../types/RelationResponseItem"
import {ControllerNodeType} from "../types/ControllerNodeType"
import {convertModelRelationToControllerRelation} from "../relations/convertModelRelationToControllerRelation"
import {RelationType} from "../types/RelationType"
import type {RelationCollectionResponse} from "../types/RelationCollectionResponse"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse500} from "../responses/sendResponse500"

export async function getNodesPrimeImage(req: express.Request, res: express.Response) {
    const nodeIds = req.params.ids.split(',').map(id => Number(id))

    try {
        const modelRelations = await Node.findPrimeImages(nodeIds)
        const items: RelationResponseItem[] = []

        modelRelations.forEach((modelRelation, startNodeId) => {
            if (modelRelation === null) {
                items.push({
                    type: ControllerNodeType.Node,
                    id: 0,
                    attributes: {
                        start_node_id: startNodeId,
                    },
                })
            } else {
                const controllerRelation = convertModelRelationToControllerRelation(modelRelation)

                const {id, ...attributes} = controllerRelation.to_node.fields
                items.push({
                    type: controllerRelation.to_node.node_type,
                    id,
                    attributes: {...attributes, start_node_id: startNodeId},
                })
            }
        })

        const marshalledData = {
            links: {
                self: `/nodes/${nodeIds.join(',')}/${RelationType.NodeHasPrimeImage}`,
            },
            data: items,
        } satisfies RelationCollectionResponse

        return sendResponse200(marshalledData, res)
    } catch {
        return sendResponse500(res)
    }
}
