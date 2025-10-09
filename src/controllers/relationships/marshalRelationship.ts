import {dasherize} from "inflection"
import type {RelationshipResponse} from "./types/RelationshipResponse"
import type {BaseNode} from "../nodes/types/BaseNode"
import type {NodeType} from "../nodes/types/NodeType"

export function marshalRelationship(relationship: any, partnerNode: BaseNode, partnerNodeType: NodeType) {
    return {
        data: {
            relationship_id: relationship.relationship_id,
            relationship_name: dasherize(relationship.relationship_name.toLowerCase()),
            relationship_partner: {
                node_type: partnerNodeType,
                data: partnerNode || {}
            },
            created_at: relationship.created_at,
            updated_at: relationship.updated_at,
        },
    } as RelationshipResponse
}
