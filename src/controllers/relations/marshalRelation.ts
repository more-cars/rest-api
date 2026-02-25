import type {Relation} from "../types/Relation"
import type {RelationResponse} from "../types/RelationResponse"

export function marshalRelation(relation: Relation) {
    const marshalledRelation: RelationResponse = {
        data: {
            relationship_id: relation.id,
            relationship_name: relation.type,
            relationship_partner: {
                node_type: relation.partner_node.node_type,
                data: relation.partner_node.fields,
            },
            created_at: relation.created_at,
            updated_at: relation.updated_at,
        },
    }

    return marshalledRelation
}
