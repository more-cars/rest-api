import {dasherize} from "inflection"
import type {RelationshipResponse} from "./types/RelationshipResponse"
import type {BaseNode} from "../nodes/types/BaseNode"
import type {NodeType} from "../nodes/types/NodeType"
import type {BaseRelationship} from "./types/BaseRelationship"

export function marshalRelationship(relationship: BaseRelationship, partnerNode: BaseNode, partnerNodeType: NodeType | null) {
    return {
        data: {
            relationship_id: relationship.relationship_id,
            relationship_name: dasherize(relationship.relationship_name.toLowerCase()),
            relationship_partner: {
                node_type: dasherize(partnerNodeType as string || '-'),
                data: partnerNode || {}
            },
            created_at: relationship.created_at,
            updated_at: relationship.updated_at,
        },
    } as RelationshipResponse
}
