import {RevisionNode as RevisionNodeInput} from "../../../../db/node-types/revisions/types/RevisionNode"
import {ModelNodeType} from "../../../types/ModelNodeType"
import type {RevisionNode} from "../types/RevisionNode"

export function convertRevisionDbNodeToModelNode(data: RevisionNodeInput): RevisionNode {
    return {
        node_type: ModelNodeType.Revision,
        attributes: data.properties,
    } satisfies RevisionNode
}
