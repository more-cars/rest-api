import type {Relation} from "../types/Relation"
import type {RelationResponse} from "../types/RelationResponse"

export function marshalRelation(relation: Relation) {
    const marshalledRelation: RelationResponse = {
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
        },
    }

    return marshalledRelation
}
