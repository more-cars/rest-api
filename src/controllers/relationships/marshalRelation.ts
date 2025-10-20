import {dasherize} from "inflection"
import type {GenericRelation} from "../../models/relationships/types/GenericRelation"
import type {NodeType} from "../nodes/types/NodeType"
import {marshalSingleNode} from "../nodes/marshalSingleNode"
import type {RelationshipResponse} from "./types/RelationshipResponse"

export function marshalRelation(relation: GenericRelation, partnerNodeType: NodeType) {
    return {
        data: {
            relationship_id: relation.id,
            relationship_name: dasherize(relation.type.toLowerCase()),
            relationship_partner: {
                node_type: dasherize(partnerNodeType),
                data: marshalSingleNode(relation.destination).data,
            },
            created_at: relation.created_at,
            updated_at: relation.updated_at,
        },
    } as RelationshipResponse
}
