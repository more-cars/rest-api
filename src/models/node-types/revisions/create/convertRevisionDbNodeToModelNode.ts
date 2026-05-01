import {RevisionNode as RevisionNodeInput} from "../../../../db/node-types/revisions/types/RevisionNode"
import {ModelNodeType} from "../../../types/ModelNodeType"
import type {RevisionNode} from "../types/RevisionNode"

export function convertRevisionDbNodeToModelNode(data: RevisionNodeInput): RevisionNode {
    return {
        node_type: ModelNodeType.Revision,
        attributes: {
            id: data.properties.id,

            node_type: data.properties.node_type,
            node_id: data.properties.node_id,
            node_created_at: data.properties.node_created_at,
            node_updated_at: data.properties.node_updated_at,
            // TODO add remaining props

            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies RevisionNode
}
