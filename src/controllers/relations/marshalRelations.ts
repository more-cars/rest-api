import type {Relation} from "../types/Relation"
import type {RelationResponseItem} from "../types/RelationResponseItem"
import type {RelationCollectionResponse} from "../types/RelationCollectionResponse"
import type {ControllerNodeType} from "../types/ControllerNodeType"
import type {RelationType} from "../types/RelationType"

export function marshalRelations(relations: Relation[], fromNodeType: ControllerNodeType, fromNodeId: number | number[], relationType: RelationType) {
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

    return {
        links: {
            self: `/${fromNodeType}/${fromNodeId}/${relationType}`,
        },
        data: items,
    } satisfies RelationCollectionResponse
}
